'use strict'

const UserModel = use('App/Models/User')
const PostModel = use('App/Models/Post')

class SavedController {
  async index({ request, response, view, params, auth }) {
    // const $userFavourites = await auth.user.favourites().fetch()
    const userId = await auth.user.id

    // const $user = await UserModel.find(userId)
    // return $user.favourites().fetch();

    const $user = await UserModel.query().where('id', userId).with('favourites').fetch()
    // const $fav = await user.query().with('favourites').fetch()

    return $user
    // return $userFavourites
    // return view.render('saved.index', { user: $user })
  }

  // A User can have MANY favourite posts
  // A favourite post can belong to one User(owner)
  async store({ request, response, view, session, params, auth }) {
    const userId = await auth.user.id;
    const $user = await UserModel.find(userId);
    await $user.favourites().attach(params.id);

    session.flash({ notification: 'Post saved'})

    return response.redirect('back')
  }

  async destroy({ request, response, view, session, params, auth }){
    const userId = await auth.user.id;
    const $user = await UserModel.find(userId);
    await $user.favourites().detach(params.id);

    session.flash({ notification: 'Post unsaved'})

    return response.redirect('back')
  }
}

module.exports = SavedController
