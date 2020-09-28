'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PivotPostUserSchema extends Schema {
  up () {
    this.create('pivot_post_user', (table) => {
      table.increments()
      table.timestamps()
      table.integer('post_id').unsigned()
      table.integer('user_id').unsigned()
    })
  }

  down () {
    this.drop('pivot_post_user')
  }
}

module.exports = PivotPostUserSchema
