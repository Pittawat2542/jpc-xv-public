exports.up = function(knex, Promise) {
  return knex.schema.createTable("jpc_xv_answers", function(table) {
    table.increments();

    table.text("answer1");
    table.text("answer2");
    table.string("answer2_choice");
    table.text("answer3");
    table.text("answer4");
    table.text("answer5");
    table.text("answer6");

    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("jpc_xv_answers");
};
