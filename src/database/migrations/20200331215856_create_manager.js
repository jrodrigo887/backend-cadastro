
exports.up = function (knex) {
	return knex.schema.createTable('manager', function (table) {
		table.increments();
		table.string('cpf').primary().notNullable();
		table.string('cell').notNullable();
		table.string('email').notNullable();
		table.string('full_name').notNullable();
		table.datetime('date');
		table.timestamp('created_at').defaultTo(knex.fn.now());
		
		table.unique(['cpf', 'email']);

	})


};

exports.down = function (knex) {
	return knex.schema.dropTable('manager');

};
