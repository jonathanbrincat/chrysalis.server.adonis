'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfilesSchema extends Schema {
  up () {
    this.create('profiles', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').unsigned()
      table.string('first_name')
      table.string('last_name')
      table.string('avatar')
    })
  }

  down () {
    this.drop('profiles')
  }
}

module.exports = ProfilesSchema
