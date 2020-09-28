'use strict'

const UserModel = use('App/Models/User')

class PageController {
  async index({ request, response, view }) {
    return view.render('index');
  }
}

module.exports = PageController
