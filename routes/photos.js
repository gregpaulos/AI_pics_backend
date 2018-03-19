const express = require("express");
const router = express.Router();
const unsplash = require("../functions/api_calls").unsplash;
const queries = require("../functions/db_queries");
const database = require("../db_connection");


router.get("/", (req, res, next) => {
  const greeting = "photos route says hello!";
  res.json(greeting);
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

router.get("/:id", (request, response, next) => {
    queries
      .find_photo_by_id(request.params.id)
      .then(results => {
        let list = results.rows;
        response.json({ results });
      })
      .catch(next);
  });

module.exports = router;
