'use strict'

const UserModel = use('App/Models/User')

class ProfileController {
  async index({ request, response, view }) {
    const user = await UserModel.first()
    const profile = await user.profile().fetch()

    return view.render('profile.index', {
      profile: profile.toJSON()
    });
  }
}

module.exports = ProfileController
