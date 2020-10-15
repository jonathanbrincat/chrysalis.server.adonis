'use strict'

const UserModel = use('App/Models/User')

class ProfileController {
  async index({ request, response, view, auth }) {
    const $foo = await auth.user.profile().fetch()
    const $bar = await auth.user.profile().with('user').fetch()
    const $user = await UserModel.find(auth.user.id)
    const $profile = await $user.profile().fetch()

    // return $foo.toJSON()
    // return $bar.toJSON()
    // return $user.toJSON()
    // return $profile.toJSON()

    return view.render('profile.index', {
      profile: $profile.toJSON(),
      user: $user.toJSON(),
      bar: $bar.toJSON()
    });
  }
}

module.exports = ProfileController
