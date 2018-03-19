const express = require("express");
const router = express.Router();
const unsplash = require("../functions/api_calls").unsplash;
const queries = require("../functions/db_queries");
const database = require("../db_connection");
const helpers = require("../functions/helpers");

router.get("/", (req, res, next) => {
  queries
    .all_photos()
    .then(results => {        
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
