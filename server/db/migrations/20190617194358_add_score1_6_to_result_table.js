exports.up = function(knex, Promise) {
  return knex.schema.table("jpc_xv_results", function(table) {
    table.integer("score1").defaultTo(0);
    table.integer("score2").defaultTo(0);
    table.integer("score3").defaultTo(0);
    table.integer("score4").defaultTo(0);
    table.integer("score5").defaultTo(0);
    table.integer("score6").defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("jpc_xv_results", function(table) {
    table.dropColumn("score1");
    table.dropColumn("score2");
    table.dropColumn("score3");
    table.dropColumn("score4");
    table.dropColumn("score5");
    table.dropColumn("score6");
  });
};
