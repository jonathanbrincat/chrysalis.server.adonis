'use strict'

class GuideController {
  async index({ request, response, view }) {
    return view.render('guides.index')
  }

  async show({ request, response, view, params }) {
    return view.render('guides.show', {
      id: params.id
    })
  }
}

module.exports = GuideController
