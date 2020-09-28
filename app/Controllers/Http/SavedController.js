'use strict'

const UserModel = use('App/Models/User')
const PostModel = use('App/Models/Post')

class SavedController {
  async index({ request, response, view, params, auth }) {
    // const userFavourites = await auth.user.favouritePosts().fetch()
    const userId = await auth.user.id
    // const user = await UserModel.find(userId)
    // return user.favouritePosts().fetch();
    const user = await UserModel.query().where('id', '=', userId).with('favouritePosts').fetch()
    // const fav = await user.query().with('favouritePosts').fetch()

    // return userFavourites

    return user
    return view.render('saved.index', { user: user })
  }

  // A User can have MANY favourite posts
  // A favourite post can belong to one User(owner)
  async store({ request, response, view, session, params, auth }) {
    const userId = await auth.user.id;
    const user = await UserModel.find(userId);
    await user.favouritePosts().attach(params.id);

    session.flash({ notification: 'Post saved'})

    return response.redirect('back')
  }

  async destroy({ request, response, view, session, params, auth }){
    const userId = await auth.user.id;
    const user = await UserModel.find(userId);
    await user.favouritePosts().detach(params.id);

    session.flash({ notification: 'Post unsaved'})

    return response.redirect('back')
  }
}

module.exports = SavedController
