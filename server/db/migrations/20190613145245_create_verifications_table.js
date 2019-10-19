exports.up = function(knex, Promise) {
  return knex.schema.createTable("jpc_xv_verifications", function(table) {
    table.string("user_id").primary();
    table.string("pickup_location");
    table.string("shirt_size");
    table.string("verification_proof_file_name");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("jpc_xv_verifications");
};
