exports.up = function(knex, Promise) {
  return knex.schema.createTable("jpc_xv_staffs", function(table) {
    table
      .string("staff_id")
      .primary()
      .unique()
      .notNullable();
    table.string("student_id");
    table.string("name");
    table.string("surname");
    table.string("role");
    table.integer("current_index").defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("jpc_xv_staffs");
};
