
exports.up = function (knex) {
    return knex.schema.createTable("elements", tbl => {
        tbl.increments("element_id");
        tbl.string("name", 255).unique().notNullable();
        tbl.string("symbol", 255).unique().notNullable();
        tbl.integer("periodic_number", 255).unique().notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("elements");
};
