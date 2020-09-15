'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PerksSchema extends Schema {
  up () {
    this.createIfNotExists('perks', (table) => {
      table.increments()
      table.string('merchant')
      table.text('title')
      table.text('blurb')
      table.text('body')
      table.string('gfx_logo_src')
      table.string('img_header_src')
      table.string('code')
      table.datetime('expiry')
      table.boolean('is_enabled')
      table.timestamps()
    })
  }

  down () {
    this.drop('perks')
  }
}

module.exports = PerksSchema
