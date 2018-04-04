const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");
const unsplash = require("../functions/api_calls").unsplash;
const queries = require("../functions/db_queries");
const database = require("../db_connection");
const helpers = require("../functions/helpers");
const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = "us-east-1";

router.get("/", (req, res, next) => {
  queries
    .all_photos_with_descriptions()
    .then(resultsRaw => {
      let resultsDict = resultsRaw.rows.reduce((accumulator, current) => {
        accumulator[current.id]
          ? accumulator[current.id].apis[current.api_name]
            ? accumulator[current.id].apis[current.api_name].push(
                current.description
              )
            : (accumulator[current.id].apis[current.api_name] = [
                current.description
              ])
          : (accumulator[current.id] = {
              url: current.photo_url,
              apis: { [current.api_name]: [current.description] }
            });

        return accumulator;
      }, {});
      let results = [];
      for (key in resultsDict) {
        results.push(resultsDict[key]);
      }

      res.json({ results });
    })
    .catch(next);
});

router.get("/random", (req, res, next) => {
  unsplash()
    .then(data => {
      // add the photo to our database before sending url to client
      queries
        .add_photo(data)
        .then(result => {
          // database.destroy()
        })
        .catch(err => {
          console.error(err);
          // database.destroy()
        });
      // send the url to client
      res.json(data);
    })
    .catch(error => {
      console.log(error);
      res.send(error);
    });
});

router.post("/clientupload", (req, res) => {
  const fileType = req.body.fileType;
  var count;
  queries.all_photos().then(results => {
    count = results.length;
    const fileName = `photo${count}num`;
    const s3 = new aws.S3();
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: "public-read"
    };
    s3.getSignedUrl("putObject", s3Params, (err, data) => {
      if (err) {
        console.log(err);
        return res.end();
      }
      let url = `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`;
      const returnData = {
        signedRequest: data,
        url: url
      };
      queries
        .add_photo(url)
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
      res.write(JSON.stringify(returnData));
      res.end();
    });
  });
});

router.get("/descriptions", (request, response, next) => {
  queries
    .all_descriptions()
    .then(results => {
      response.json({ results });
    })
    .catch(next);
});

router.get("/descriptions/:api", (request, response, next) => {
  queries
    .all_descriptions_for_api(request.params.api)
    .then(results => {
      let list = results.rows;
      let photos_and_descriptions = helpers.description_combiner(list);
      response.json({ photos_and_descriptions });
    })
    .catch(next);
});

router.get("/:id", (request, response, next) => {
  queries
    .find_photo_by_id(request.params.id)
    .then(results => {
      let list = results.rows;
      response.json({ results });
    })
    .catch(next);
});

router.get("/:id/descriptions", (request, response, next) => {
  queries
    .one_photo_with_description(request.params.id)
    .then(results => {
      let list = results.rows;
      let photo_and_description = helpers.description_combiner(list)[
        request.params.id
      ];
      response.json({ photo_and_description });
    })
    .catch(next);
});

module.exports = router;
