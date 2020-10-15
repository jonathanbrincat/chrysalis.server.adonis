'use strict'

const PostModel = use('App/Models/Post')
const TagModel = use('App/Models/Tag')

class TagController {
  async index({ request, response, view, params, auth }) {
    const $tag = await TagModel.find(params.id)

    const index = request.get().page || 1 //take from querystring param if it exists
    const $posts = await $tag.posts().withCount('likes').paginate(index, 5)

    // NOTE! user has to be logged in other auth.user will be null
    let currentUserFavouritesWithPosts = []
    if(auth.user) {
      currentUserFavouritesWithPosts = await auth.user.favourites().ids() // will return the current user's favourited post in an array containing their ids
    }

    const $tagsModel = await TagModel.all()

    // return response.status(200).json($posts)
    return view.render('posts.index', {
      posts: $posts.toJSON(),
      favourites: Array.from(currentUserFavouritesWithPosts),
      tags: $tagsModel.toJSON(),
      tag: $tag
    })
  }

  async index2({ request, response, view }) {
    // console.log('jb :1: ', request.all().category)
    // console.log('jb :2: ', request.input('category'))

    const id = request.input('category')
    const $tag = await TagModel.find(id)

    const index = request.get().page || 1 //take from querystring param if it exists
    const $posts = await $tag.posts().withCount('likes').paginate(index, 5)

    const $tagsModel = await TagModel.all()

    // return response.status(200).json($posts)
    return view.render('posts.index', {
      posts: $posts.toJSON(),
      // favourites:
      tags: $tagsModel.toJSON(),
      tag: $tag
    })
  }
}

module.exports = TagController
