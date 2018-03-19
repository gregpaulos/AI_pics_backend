const fetch = require("node-fetch");

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

module.exports = {
  unsplash
};
