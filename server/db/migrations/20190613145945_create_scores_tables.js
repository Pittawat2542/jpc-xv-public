exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("jpc_xv_score1", function(table) {
      table.string("user_id");
      table.string("staff_id");
      table.integer("score");
      table.text("additional_note");
      table.timestamps(true, true);

      table.primary(["user_id", "staff_id"]);
    })
    .then(() =>
      knex.schema.createTable("jpc_xv_score2", function(table) {
        table.string("user_id");
        table.string("staff_id");
        table.integer("score");
        table.text("additional_note");
        table.timestamps(true, true);

        table.primary(["user_id", "staff_id"]);
      })
    )
    .then(() =>
      knex.schema.createTable("jpc_xv_score3", function(table) {
        table.string("user_id");
        table.string("staff_id");
        table.integer("score");
        table.text("additional_note");
        table.timestamps(true, true);

        table.primary(["user_id", "staff_id"]);
      })
    )
    .then(() =>
      knex.schema.createTable("jpc_xv_score4", function(table) {
        table.string("user_id");
        table.string("staff_id");
        table.integer("score");
        table.text("additional_note");
        table.timestamps(true, true);

        table.primary(["user_id", "staff_id"]);
      })
    )
    .then(() =>
      knex.schema.createTable("jpc_xv_score5", function(table) {
        table.string("user_id");
        table.string("staff_id");
        table.integer("score");
        table.text("additional_note");
        table.timestamps(true, true);

        table.primary(["user_id", "staff_id"]);
      })
    )
    .then(() =>
      knex.schema.createTable("jpc_xv_score6", function(table) {
        table.string("user_id");
        table.string("staff_id");
        table.integer("score");
        table.text("additional_note");
        table.timestamps(true, true);

        table.primary(["user_id", "staff_id"]);
      })
    );
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("jpc_xv_score1")
    .then(() => knex.schema.dropTableIfExists("jpc_xv_score2"))
    .then(() => knex.schema.dropTableIfExists("jpc_xv_score3"))
    .then(() => knex.schema.dropTableIfExists("jpc_xv_score4"))
    .then(() => knex.schema.dropTableIfExists("jpc_xv_score5"))
    .then(() => knex.schema.dropTableIfExists("jpc_xv_score6"));
};
