'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EntrySchema extends Schema {
  up () {
    this.create('entries', (table) => {
      table.increments()
      table.timestamps()
      table.string('title')
      table.text('body')
      table.string('name')
      table.string('sex')
      table.tinyint('age').unsigned()
      table.string('colour')
      table.string('type')
      table.tinyint('is_registered').unsigned()
      table.tinyint('is_available').unsigned()
      table.integer('post_id').unsigned()
    })
  }

  down () {
    this.drop('entries')
  }
}

module.exports = EntrySchema
