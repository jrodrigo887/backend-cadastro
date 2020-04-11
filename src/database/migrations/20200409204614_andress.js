
exports.up = function(knex) {

	return knex.schema.createTable('andress', function (table) {
		table.increments().primary();
		table.string('regist_teacher');
		table.foreign('regist_teacher').references('registration').inTable('teacher');
		table.string('street');
		table.string('district');
		table.string('city');
		table.string('state');
		table.boolean('zipCode');
		table.timestamp('created_at').defaultTo(knex.fn.now());

	});
};


exports.down = function(knex) {
	return knex.schema.dropTable('andress');
};
