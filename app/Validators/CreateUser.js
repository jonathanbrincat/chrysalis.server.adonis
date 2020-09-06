'use strict'

class CreateUser {
  get rules () {
    return {
      // validation rules
      'username': 'required|unique:users',
      'email': 'required|unique:users',
      'password': 'required',
    }
  }

  get messages() {
    return {
      'required': 'Woah now, {{ field }} is required.',
      'unique': 'Wait a second, {{ field }} already exists.',
    }
  }

  async fails(error) {
    // DEVNOTE: ctx = context
    this.ctx.session.withErrors(error).flashAll()

    return this.ctx.response.redirect('back')
  }
}

module.exports = CreateUser
