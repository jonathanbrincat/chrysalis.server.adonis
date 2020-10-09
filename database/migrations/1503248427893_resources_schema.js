'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ResourcesSchema extends Schema {
  up () {
    this.create('resources', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('resources')
  }
}

module.exports = ResourcesSchema
