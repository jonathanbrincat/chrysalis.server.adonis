'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.timestamps()
      table.string('title')
      table.text('body')
      table.string('image') //all curated images will go into an sepatate images table, the relationship between post_id and gallery_id/article_id
      // table.boolean('isPromoted') // for mock up purposes this can be allowed to fly however do not do this. decouple and treat state like a microservice. we will make a request to a self-contained service with for instance a userid or postid(optional) asking if that entity is promoted and get promoted ids as a response
      // table.boolean('isActive') //see above. although is perhaps a stronger arguement to keep this coupled
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id').onDelete('cascade') //when delete a user. the posts associated with that user are deleted too
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema

// Topography
// A user can have many posts. A post belongs to a sigle user.
// A single post(advert) can consist of many articles. an article belongs to one post.
// A single article can have a single gallery. a gallery belongs to an article. (An article will have it's own header and a body field)
// A gallery can have many images. images belong to a gallery.


// Endpoint for
// Promoted adverts. query should just fetch all adverts with the isPromoted state. randomly shuffled and then paginated.
// Latest adverts. query should just fetch all adverts as a paginated set sorted by date
// User saved adverts. query should fetch all user saved as apaginated collection and sorted by date(most recent first)
// Recently visited. Research into implementations and practises required.
