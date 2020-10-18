'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DraftsSchema extends Schema {
  up () {
    this.create('drafts', (table) => {
      table.increments()
      table.timestamps()
      table.string('title')
      table.text('body')
      table.integer('user_id').unsigned()
    })
  }

  down () {
    this.drop('drafts')
  }
}

module.exports = DraftsSchema
