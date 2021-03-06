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

  async destroy() {

  }

  async updateUsername({ request, response, view, auth }) {

  }

  async updateName({ request, response, view, auth }) {
    const { firstname, lastname } = request.all()

    const $user = await auth.user.profile().update({ firstname, lastname })

    return response.redirect('back')
  }

  async updateAddress({ request, response, view, auth }) {
    const address = request.only(['address_identity', 'address_line_1', 'address_line_2', 'address_location', 'address_region', 'address_postcode'])

    const $user = await auth.user.profile().update(address)

    return response.redirect('back')
  }

  async updatePhone({ request, response, view, auth }) {

  }

  async updateEmail({ request, response, view, auth }) {

  }

  async updatePassword({ request, response, view, auth }) {

  }
}

module.exports = ProfileController
