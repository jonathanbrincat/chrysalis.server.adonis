'use strict'

const Post = use('App/Models/Post')

class DashboardController {
  async index({ request, response, view, auth }) {
    const ordering = ['title', 'asc']

    // const $posts = await Post.query().orderBy(...ordering).fetch()
    const $curated = await auth.user.posts().orderBy(...ordering).fetch()
    const $favourites = await auth.user.favourites().orderBy(...ordering).fetch()

    return view.render('dashboard.index', {
      // posts: $posts.toJSON(),
      curated: $curated.toJSON(),
      favourites: $favourites.toJSON()
    })
  }
}

module.exports = DashboardController
