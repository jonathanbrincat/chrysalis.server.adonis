'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PerksSchema extends Schema {
  up () {
    this.createIfNotExists('perks', (table) => {
      table.increments()
      table.text('title')
      table.text('body')
      table.string('logo_src')
      table.string('hero_src')
      table.datetime('expiry')
      table.timestamps()
    })
  }

  down () {
    this.drop('perks')
  }
}

module.exports = PerksSchema
