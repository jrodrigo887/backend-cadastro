
exports.up = function (knex) {
  return knex.schema.createTable('teacher', function (table) {
    table.increments('id')
    table.string('registration').notNullable()
    table.string('cpf').notNullable()
    table.string('cell').notNullable()
    table.string('email').notNullable()
    table.string('full_name').notNullable()
    table.string('school').notNullable()
    table.string('city').notNullable()
    table.string('type')
    table.boolean('confirmed')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.datetime('date')

    table.string('idManager')

    table.unique(['id', 'cpf', 'registration'])
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('teacher')
}
