exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and makes sure ID always restarts after the first two things we put in
  return knex
    .raw(
      'DELETE FROM "photos"; ALTER SEQUENCE photos_id_seq RESTART WITH 2;'
    )
    .then(function() {
      var photos = [
        {
          id: 1,
          photo_url:
            "https://images.unsplash.com/photo-1518843025960-d60217f226f5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE5NjkzfQ&s=8a28efad39094a7be3a369396332fd02"
        },
      ];
      // Inserts seed entries
      return knex("photos").insert(photos);
    });
};
