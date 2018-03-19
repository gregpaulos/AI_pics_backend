const express = require("express");
const router = express.Router();
const queries = require("../functions/db_queries");
const database = require("../db_connection");
const send_to_AI = require("../functions/api_calls").send_to_AI;

router.post("/watson", (req, res, next) => {
  const photo_url = req.body.photo;
  const api_id = 2;
  send_to_AI(photo_url, api_id)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.log(error);
      res.send(error);
    });
});

router.post("/google", (req, res, next) => {
  const photo_url = req.body.photo;
  const api_id = 1;
  send_to_AI(photo_url, api_id)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.log(error);
      res.send(error);
    });
});

router.post("/clarifai", (req, res, next) => {
  const photo_url = req.body.photo;
  const api_id = 3;
  send_to_AI(photo_url, api_id)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.log(error);
      res.send(error);
    });
});

module.exports = router;
