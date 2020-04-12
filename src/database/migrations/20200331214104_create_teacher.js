
exports.up = function (knex) {
  return knex.schema.createTable('teacher', function (table) {
    table.increments('id').primary()
    table.string('registration').notNullable()
    table.string('cpf').notNullable()
    table.string('cell').notNullable()
    table.string('email').notNullable()
    table.string('full_name').notNullable()
    table.string('school').notNullable()
    table.string('city').notNullable()
	table.string('type')
	table.string('andress')
    table.boolean('confirmed').defaultTo(false)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.date('date')
    table.string('confi_admin')

    table.unique(['id', 'cpf', 'registration'])
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('teacher')
}
