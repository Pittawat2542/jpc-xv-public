exports.up = function(knex, Promise) {
  return knex.schema.createTable("jpc_xv_results", function(table) {
    table.string("user_id").primary();
    table.integer("total_score");
    table.integer("status").defaultTo(0);
    table.text("additional_note");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("jpc_xv_results");
};
