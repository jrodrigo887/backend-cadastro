
exports.up = function (knex) {
	return knex.schema.createTable('manager', function (table) {
		table.string('id').primary();
		table.string('cpf').notNullable();
		table.string('cell').notNullable();
		table.string('email').notNullable();
		table.string('full_name').notNullable();
		table.string('user').notNullable();
		table.decimal('value').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.datetime('date');
		
		table.unique(['id', 'cpf']);

	})


};

exports.down = function (knex) {
	return knex.schema.dropTable('manager');

};
