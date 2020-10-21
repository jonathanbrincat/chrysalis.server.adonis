'use strict'

/* PIVOT TABLE for many to many relationship */
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PivotPostTagSchema extends Schema {
  up () {
    this.create('pivot_post_tag', (table) => {
      table.increments()
      table.integer('tag_id').unsigned()
      table.integer('draft_id').unsigned()
      table.integer('post_id').unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('pivot_post_tag')
  }
}

module.exports = PivotPostTagSchema
