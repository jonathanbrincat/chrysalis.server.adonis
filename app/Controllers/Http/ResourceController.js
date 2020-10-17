'use strict'

const Resource = use('App/Models/Resource')

class ResourceController {
  // create
  async create({ request, response, view }) {
    return 'resource create'
  }

  async store({ request, response, view }) {

  }

  // delete
  async destroy({ request, response, view, params, session }) {
    // return 'resource destroy' + params.id

    const $resource = await Resource.find(params.id)

    await $resource.delete()

    session.flash({ notification: 'The resource has been deleted'})

    return response.redirect('back')
  }
}

module.exports = ResourceController
