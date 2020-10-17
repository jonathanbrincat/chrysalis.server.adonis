'use strict'

class EntryController {
  // create
  async create({ request, response, view }) {
    return 'entry create'
  }

  async store({ request, response, view }) {

  }

  // delete
  async destroy({ request, response, view }) {
    return 'entry destroy'
  }
}

module.exports = EntryController
