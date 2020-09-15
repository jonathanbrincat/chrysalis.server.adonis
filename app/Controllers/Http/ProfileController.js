'use strict'

const UserModel = use('App/Models/User')

class ProfileController {
  async index({ request, response, view }) {
    const user = await UserModel.find(1) //1 = id
    const profile = await user.profile().fetch()

    return view.render('profile', {
      profile: profile.toJSON()
    });
  }
}

module.exports = ProfileController
