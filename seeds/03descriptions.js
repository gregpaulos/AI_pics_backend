exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and makes sure ID always restarts after the first two things we put in
  return knex
    .raw(
      'DELETE FROM "descriptions"; ALTER SEQUENCE descriptions_id_seq RESTART WITH 16;'
    )
    .then(function() {
      var descriptions = [
        {
          id: 1,
          description: "cat",
          photo_id: 1,
          api_id: 1
        },
        {
          id: 2,
          description: "mammal",
          photo_id: 1,
          api_id: 1
        },
        {
          id: 3,
          description: "small to medium sized cats",
          photo_id: 1,
          api_id: 1
        },
        {
          id: 4,
          description: "dragon li",
          photo_id: 1,
          api_id: 1
        },
        {
          id: 5,
          description: "cat like mammal",
          photo_id: 1,
          api_id: 1
        },

        {
          id: 6,
          description: "cat",
          photo_id: 1,
          api_id: 2
        },
        {
          id: 7,
          description: "feline",
          photo_id: 1,
          api_id: 2
        },
        {
          id: 8,
          description: "carnivore",
          photo_id: 1,
          api_id: 2
        },
        {
          id: 9,
          description: "mammal",
          photo_id: 1,
          api_id: 2
        },
        {
          id: 10,
          description: "animal",
          photo_id: 1,
          api_id: 2
        },
        {
          id: 11,
          description: "cat",
          photo_id: 1,
          api_id: 3
        },
        {
          id: 12,
          description: "cute",
          photo_id: 1,
          api_id: 3
        },
        {
          id: 13,
          description: "fur",
          photo_id: 1,
          api_id: 3
        },
        {
          id: 14,
          description: "animal",
          photo_id: 1,
          api_id: 3
        },
        {
          id: 15,
          description: "eye",
          photo_id: 1,
          api_id: 3
        }
      ];
      // Inserts seed entries
      return knex("descriptions").insert(descriptions);
    });
};
