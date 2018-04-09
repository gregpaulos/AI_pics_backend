exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and makes sure ID always restarts after the first two things we put in
  return knex
    .raw('DELETE FROM "apis"; ALTER SEQUENCE apis_id_seq RESTART WITH 4;')
    .then(function() {
      var apis = [
        {
          id: 1,
          api_name: "google"
        },
        {
          id: 2,
          api_name: "watson"
        },
        {
          id: 3,
          api_name: "clarifai"
        }
      ];
      // Inserts seed entries
      return knex("apis").insert(apis);
    });
};
