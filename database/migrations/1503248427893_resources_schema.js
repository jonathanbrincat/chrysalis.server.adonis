'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ResourcesSchema extends Schema {
  up () {
    this.create('resources', (table) => {
      table.increments()
      table.timestamps()
      table.string('filename')
      table.string('description')
      table.string('contenttype')
      table.string('dimensions')
      table.integer('filesize')
      table.integer('entry_id').unsigned()
      table.integer('user_id').unsigned()
    })
  }

  down () {
    this.drop('resources')
  }
}

module.exports = ResourcesSchema
