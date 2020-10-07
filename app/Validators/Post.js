'use strict'

class Post {
  get rules () {
    return {
      // validation rules
      title: 'required',
      body: 'required',
    }
  }

  get messages() {
    return {
      'required': 'Hold up, the {{ field }} is required.'
    }
  }

  async fails(error) {
    // DEVNOTE: ctx = context
    this.ctx.session.withErrors(error).flashAll()

    return this.ctx.response.redirect('back')
  }
}

module.exports = Post
