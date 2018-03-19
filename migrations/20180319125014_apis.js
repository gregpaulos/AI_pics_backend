exports.up = function(knex, Promise) {
  return knex.schema.createTable("apis", table => {
    table.increments();
    table.text("api_name");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("apis");
};
