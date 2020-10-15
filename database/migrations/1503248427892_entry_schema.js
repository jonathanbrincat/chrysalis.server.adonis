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
      table.decimal('value', 2)
      table.boolean('is_registered')
      table.boolean('is_available')
      table.integer('post_id').unsigned()
    })
  }

  down () {
    this.drop('entries')
  }
}

module.exports = EntrySchema
