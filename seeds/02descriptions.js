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
          description: "mountainous landforms",
          photo_id: 1,
          api_id: 1
        },
        {
          id: 2,
          description: "mountain",
          photo_id: 1,
          api_id: 1
        },
        {
          id: 3,
          description: "mountain range",
          photo_id: 1,
          api_id: 1
        },
        {
          id: 4,
          description: "sky",
          photo_id: 1,
          api_id: 1
        },
        {
          id: 5,
          description: "fell",
          photo_id: 1,
          api_id: 1
        },

        {
          id: 6,
          description: "mountain range",
          photo_id: 1,
          api_id: 2
        },
        {
          id: 7,
          description: "nature",
          photo_id: 1,
          api_id: 2
        },
        {
          id: 8,
          description: "Snowy Mountains",
          photo_id: 1,
          api_id: 2
        },
        {
          id: 9,
          description: "Gray Sky",
          photo_id: 1,
          api_id: 2
        },
        {
          id: 10,
          description: "mountain",
          photo_id: 1,
          api_id: 2
        },
        {
          id: 11,
          description: "no person",
          photo_id: 1,
          api_id: 3
        },
        {
          id: 12,
          description: "contemporary",
          photo_id: 1,
          api_id: 3
        },
        {
          id: 13,
          description: "business",
          photo_id: 1,
          api_id: 3
        },
        {
          id: 14,
          description: "indoors",
          photo_id: 1,
          api_id: 3
        },
        {
          id: 15,
          description: "step",
          photo_id: 1,
          api_id: 3
        }
      ];
      // Inserts seed entries
      return knex("descriptions").insert(descriptions);
    });
};
