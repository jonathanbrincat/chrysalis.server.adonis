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
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id').onDelete('cascade') //when delete a user. the posts associated with that user are deleted too
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema
