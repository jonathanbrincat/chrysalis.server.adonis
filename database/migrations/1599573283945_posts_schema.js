'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.timestamps()
      table.string('title')
      table.text('content')
      table.integer('user_id')
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema
