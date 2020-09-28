'use strict'

const UserModel = use('App/Models/User')
const PostModel = use('App/Models/Post')

class SaveController {
  async getSaved({ request, response, view, params, auth }) {
    // const userFavourites = await auth.user.favouritePosts().fetch()
    const userId = await auth.user.id
    // const user = await UserModel.find(userId)
    const user = await UserModel.query().where('id', '=', userId).with('favouritePosts').fetch()
    // const fav = await user.query().with('favouritePosts').fetch()

    // return userFavourites

    return user
    return view.render('saved.index', { foo: user })
  }

  // A User can have MANY favourite posts
  // A favourite post can belong to one User(owner)
  async setSaved({ request, response, view, params, auth }) {
    const post = await PostModel.find(params.id)

    return response.redirect('back')
  }
}

module.exports = SaveController
