'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfilesSchema extends Schema {
  up () {
    this.create('profiles', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').unsigned()
      table.string('username', 80).notNullable().unique()
      table.string('firstname')
      table.string('lastname')
      table.text('address')
      table.string('postcode')
      table.string('country')
      table.string('avatar')
      table.tinyint('is_breeder').unsigned()
    })
  }

  down () {
    this.drop('profiles')
  }
}

module.exports = ProfilesSchema
