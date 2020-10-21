'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DraftsSchema extends Schema {
  up () {
    this.create('drafts', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.timestamps()
      table.string('title')
      table.text('body')
    })
  }

  down () {
    this.drop('drafts')
  }
}

module.exports = DraftsSchema
