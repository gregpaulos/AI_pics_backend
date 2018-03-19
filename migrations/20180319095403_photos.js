exports.up = function(knex, Promise) {
    return knex.schema.createTable("photos", table => {
      table.increments();
      table.text("photo_url");
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("photos");
  };
