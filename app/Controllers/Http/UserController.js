'use strict'

const UserModel = use('App/Models/User')

class UserController {
  async create({ request, response, auth }) {
    const user = await UserModel.create(request.only(['username', 'email', 'password']))

    await auth.login(user) //might as well log in the user too
    return response.redirect('/')
  }

  async login({ request, response , session, auth}) {
    const { email, password} = request.all()

    try {
      await auth.attempt(email, password)
      return response.redirect('/')

    }catch(error) {
      session.flash({ loginError: 'These credentials do now work'})
      return response.redirect('/')
    }

  }

  /*async logout({ request, response }) {

  }*/
}

module.exports = UserController
