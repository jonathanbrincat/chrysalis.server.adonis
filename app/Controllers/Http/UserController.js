'use strict'

const UserModel = use('App/Models/User')

class UserController {
  async create({ request, response, auth }) {
    const user = await UserModel.create(request.only(['username', 'email', 'password']))

    await auth.login(user)

    return response.redirect('/')
  }

  async login({ request, response , session, auth}) {
    const { email, password} = request.all()

    // DEVNOTE: additional; remember me; has email been confirmed; forgotten password; reset password
    try {
      await auth.attempt(email, password)

      return response.redirect('/')

    }catch(error) {
      session.flash({ loginError: 'These credentials do now work'})

      return response.redirect('/')
    }
  }

  async logout({ request, response, auth }) {
    await auth.logout()

    return response.redirect('/')
  }
}

module.exports = UserController
