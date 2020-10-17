'use strict'

class ResourceController {
  // create
  async create({ request, response, view }) {
    return 'resource create'
  }

  async store({ request, response, view }) {

  }

  // delete
  async destroy({ request, response, view }) {
    return 'resource destroy'
  }
}

module.exports = ResourceController
