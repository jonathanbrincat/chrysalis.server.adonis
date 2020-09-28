'use strict'

const PostModel = use('App/Models/Post')

class DashboardController {
  async index({ request, response, view, auth }) {
    // const posts = await PostModel.all()
    const posts = await PostModel.query().orderBy('title', 'asc').fetch()
    const userPosts = await auth.user.posts().fetch()

    //get current user favourite posts
    const currentUserFavouritesWithPosts = await auth.user.favouritePosts().fetch()
    // return currentUserFavouritesWithPosts

    //get users who have favourited current post
    //has current user favourited current post //get current post favourite user

    return view.render('dashboard.index', {
      posts: posts.toJSON(),
      userPosts: userPosts.toJSON(),
      favouritePosts: currentUserFavouritesWithPosts.toJSON()
    })
  }
}

module.exports = DashboardController
