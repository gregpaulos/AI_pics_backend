const fetch = require("node-fetch");
const Clarifai = require("clarifai");

const queries = require("./db_queries");

function unsplash() {
  return fetch("https://api.unsplash.com/photos/random", {
    method: "get",
    headers: { Authorization: "Client-ID " + process.env.UNSPLASH }
  })
    .then(response => response.json())
    .then(data => {
      return data.urls.regular;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
}

function watson(photo) {
    let url =
      "https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=" +
      process.env.WATSON +
      "&version=2016-05-20&url=" +
      photo;
    var options = {
      method: "get",
      headers: { "Content-Type": "application/json" }
    };
    return fetch(url, options)
      .then(response => response.json())
      .then(data => {
        let results = data.images[0].classifiers[0].classes.map(dic => dic.class)
        return results;
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  }
  
  function google(photo) {
    var bodyToPost = {
      requests: [
        {
          image: {
            source: {
              imageUri: ""
            }
          },
          features: [
            {
              type: "LABEL_DETECTION",
              maxResults: 10
            }
          ]
        }
      ]
    };
    bodyToPost.requests[0].image.source.imageUri = photo;
    let JSONbodyToPost = JSON.stringify(bodyToPost);
    return fetch(
      "https://vision.googleapis.com/v1/images:annotate?key=" +
        process.env.GOOGLE,
      {
        method: "post",
        body: JSONbodyToPost,
        headers: { "Content-Type": "application/json" }
      }
    )
      .then(response => response.json())
      .then(data => {
        let results = data.responses[0].labelAnnotations.map(dic => dic.description)
        return results;
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  }
  
  function clarifai(photo) {
    const clarry = new Clarifai.App({
      apiKey: process.env.CLARIFAI
    });
    return clarry.models.predict(Clarifai.GENERAL_MODEL, photo).then(
      response => {
        let results = response.outputs[0].data.concepts.map(dic => dic.name);
        return results;
      },
      err => {
        console.error(err);
        return err;
      }
    );
  }
  
  function send_to_AI(photo_url, api_id) {
    return new Promise(resolve => {
     
        let photo_id = null;
        // find the id in our photos table so can set foreign_key in description table
        queries
          .find_photo_by_url(photo_url)
          .then(result => {
            photo_id = result[0].id;
          })
          .catch(err => {
            console.error(err);
          });
      
      
        function which_api (api_id, photo_url) {
          switch (api_id) {
            case 1:
             return google(photo_url)
                break;
            case 2:
                return watson(photo_url)
                break;
            case 3:
              return clarifai(photo_url)
          }  
        }
        // figure out which api to send to and send it
        which_api(api_id, photo_url)
          .then(data => {
            // add description to our database descriptions table before sending to client
            queries
              .add_description(photo_id, api_id, data)
              .then(result => {
                console.log(result);
              })
              .catch(err => {
                console.error(err);
              });
            // send description back to routes
            resolve(data);
          })
          .catch(error => {
            console.log(error);
            resolve(data);
          });
    
    });
  }
  
  
  module.exports = {
    unsplash,
    watson,
    google,
    clarifai,
    send_to_AI,
  };
