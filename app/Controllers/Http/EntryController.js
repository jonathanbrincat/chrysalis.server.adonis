'use strict'

const Entry = use('App/Models/Entry')

class EntryController {
  // create
  async create({ request, response, view }) {
    return 'entry create'
  }

  async store({ request, response, view }) {

  }

  // delete
  async destroy({ request, response, view, params, session }) {
    // return 'entry destroy ' + params.id

    const $entry = await Entry.find(params.id)

    await $entry.resources().delete() // delete any related resources alongside operation as they are linked to something that no longer exists

    await $entry.delete()

    session.flash({ notification: 'The entry has been deleted'})

    return response.redirect('back')
  }
}

module.exports = EntryController
