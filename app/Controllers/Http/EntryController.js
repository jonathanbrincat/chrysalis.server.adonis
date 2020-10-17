'use strict'

const Entry = use('App/Models/Entry')

class EntryController {
  // create
  async create({ request, response, view, params }) {
    console.log('entry:create >> ', params.id)

    const $post = await use('App/Models/Post').find(params.id)

    return view.render('entry.create', {
      post: $post.toJSON()
    })
  }

  async store({ request, response, view, params, session }) {
    console.log('entry:store >> ', params.id)

    const $entry = new Entry()

    const $post = await use('App/Models/Post').find(params.id)
    await $post.entries().save($entry)
    console.log('jb :: ', $post)

    session.flash({ notification: 'Your entry has been created'})

    return response.redirect(`/posts/${params.id}/edit`)
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
