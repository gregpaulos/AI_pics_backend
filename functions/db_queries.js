const database = require("../db_connection");

function add_photo(photo_url) {
  return database("photos").insert({ photo_url: photo_url });
}

function find_photo_by_id(id) {
  return database("photos")
    .select("*")
    .where({ id: id });
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
  find_photo_by_id,
  all_photos,
  delete_photo
};
