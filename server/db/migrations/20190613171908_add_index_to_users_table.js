exports.up = function(knex, Promise) {
  return knex.schema.table("jpc_xv_users", function(table) {
    table.integer("index");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("jpc_xv_users", function(table) {
    table.dropColumn("index");
  });
};
