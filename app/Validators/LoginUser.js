'use strict'

class LoginUser {
  get rules () {
    return {
      // validation rules

      email: 'required|email',
      password: 'required'
    }
  }

  get messages() {
    return {
      'email': 'Hold on, {{ field }} that does not look like an email',
      'required': 'Woah now, {{ field }} is reqired',
    }
  }

  async fails(error) {
    // DEVNOTE: ctx = context
    this.ctx.session.withErrors(error).flashAll()

    return this.ctx.response.redirect('back')
  }
}

module.exports = LoginUser
