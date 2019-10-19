exports.up = function(knex, Promise) {
  return knex.schema.table("jpc_xv_users", function(table) {
    table
      .foreign("answer_id")
      .references("id")
      .inTable("jpc_xv_answers")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("jpc_xv_users", function(table) {
    table.dropColumn("answer_id");
  });
};
