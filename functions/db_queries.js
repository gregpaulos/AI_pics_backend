const database = require("../db_connection");

function add_photo(photo_url) {
  return database("photos").insert({ photo_url: photo_url });
}


module.exports = {
    add_photo,
    // find_photo,
    // all_photos,
    // delete_photo
  };