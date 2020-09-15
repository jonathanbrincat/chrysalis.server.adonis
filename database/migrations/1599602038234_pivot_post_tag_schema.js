'use strict'

/* PIVOT TABLE for many to many relationship */
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PivotPostTagSchema extends Schema {
  up () {
    this.create('pivot_post_tag', (table) => {
      table.increments()
      table.timestamps()
      table.integer('post_id')
      table.integer('tag_id')
    })
  }

  down () {
    this.drop('pivot_post_tag')
  }
}

module.exports = PivotPostTagSchema
