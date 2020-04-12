
exports.up = function (knex) {
	return knex.schema.createTable('users', function (table) {
		table.increments('id').primary();
		table.string('cpf');
		table.string('cell');
		table.string('name').notNullable();
		table.string('email').notNullable();
		table.string('password').notNullable();
		table.string('type').notNullable();
		table.date('date');
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.unique(['email', 'cpf'])
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('users')
}



