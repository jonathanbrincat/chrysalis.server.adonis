'use strict'

const UserModel = use('App/Models/User')

class ProfileController {
  async index({ request, response, view, auth }) {

    if(auth.user) {
      console.log('current user >> ', auth.user.id )
    }

    const user = await UserModel.find(auth.user.id)
    const profile = await user.profile().fetch()

    console.log('jb >> ', profile.toJSON());

    return view.render('profile.index', {
      profile: profile.toJSON(),
      user: user.toJSON()
    });
  }
}

module.exports = ProfileController
