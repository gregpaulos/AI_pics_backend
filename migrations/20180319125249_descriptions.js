exports.up = function(knex, Promise) {
    return knex.schema.createTable("descriptions", table => {
      table.increments();
      table.text("description");
      table.integer("photo_id").references("photos.id")
      table.integer("api_id").references("apis.id")
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("descriptions");
  };