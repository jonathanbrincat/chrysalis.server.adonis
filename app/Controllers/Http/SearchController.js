'use strict'

const Post = use('App/Models/Post')

class SearchController {
  async index({ request, response, view, auth }) {
    const q = request.input('q')

    if(q && q.length > 0) {
      console.log('search endpoint hit :: ', q)

      const $posts = await Post.query().where('tags', 'LIKE', '%'+q+'%').fetch() //where tag name is like query
      // const $posts = await Post.query().where('title', 'LIKE', '%'+q+'%').fetch() //lucid ORM / knex.js
      // const $posts = await Post.query().whereRaw('title like %?%', [q]).fetch() //lucid ORM / knex.js
      // const $posts = await Database.select('*').from('posts').where('title', 'LIKE', '%'+q+'%') //raw + sql
      return $posts.toJSON()

      return view.render('search.index', {
        posts: $posts.toJSON()
      })

      // return response.status(200).json({
      //   posts: $posts
      // })
    }

    return view.render('search.index', {
      posts: []
    })
  }
}

module.exports = SearchController
