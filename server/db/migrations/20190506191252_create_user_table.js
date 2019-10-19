exports.up = function(knex, Promise) {
  return knex.schema.createTable("jpc_xv_users", function(table) {
    table
      .string("id")
      .primary()
      .unique()
      .notNullable();
    table.string("th_first_name");
    table.string("th_last_name");
    table.string("en_first_name");
    table.string("en_last_name");
    table.string("nick_name");

    table.string("gender");
    table.date("birth_date");
    table.string("religion");
    table.string("national_id");

    table.string("diseases");
    table.string("food_allergy");
    table.string("medicine_allergy");
    table.string("blood_group");

    table.string("phone_number");
    table.string("email");

    table.string("parent_name");
    table.string("parent_phone_number");
    table.string("parent_relation");

    table.string("school");
    table.string("education_level");
    table.string("education_program");
    table.float("gpa");
    table.string("grade_report_file_name");
    table.string("profile_picture_file_name");

    table.integer("answer_id").unsigned();

    table
      .boolean("is_completed")
      .notNullable()
      .defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("jpc_xv_users");
};
