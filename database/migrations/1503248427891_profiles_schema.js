'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfilesSchema extends Schema {
  up () {
    this.create('profiles', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.timestamps()
      table.string('avatar')
      table.string('username', 80).notNullable().unique()
      table.string('organisation', 80).unique()
      table.string('firstname')
      table.string('lastname')
      table.string('address_identity')
      table.string('address_line_1')
      table.string('address_line_2')
      table.string('address_location')
      table.string('address_region')
      table.string('address_postcode')
      table.string('address_geolocation')
      table.string('contact_primary_phone')
      table.string('contact_primary_email', 254) //.notNullable().unique()
      table.boolean('is_verified')
      table.boolean('is_breeder')
      table.boolean('is_registered')
    })
  }

  down () {
    this.drop('profiles')
  }
}

module.exports = ProfilesSchema
