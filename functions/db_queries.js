const database = require("../db_connection");

function add_photo(photo_url) {
  return database("photos").insert({ photo_url: photo_url });
}

function add_description(photo_id, api_id, data) {
    var descriptions = data.map(description => {
      return {description: description, api_id: api_id, photo_id: photo_id }
    })
    return database("descriptions").insert(descriptions)
  }

function find_photo_by_id(id) {
  return database("photos")
    .select("*")
    .where({ id: id });
}

function find_photo_by_url(photo_url) {
  return database("photos")
    .select("id")
    .where({ photo_url: photo_url });
}

function all_photos() {
  return database("photos").select("*");
}

function delete_photo(photo_url) {
  return database("photos")
    .where({ photo_url: photo_url })
    .del();
}

module.exports = {
  add_photo,
  add_description,
  find_photo_by_id,
  find_photo_by_url,
  all_photos,
  delete_photo
};
