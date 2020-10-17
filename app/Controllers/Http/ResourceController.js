'use strict'

const Resource = use('App/Models/Resource')

class ResourceController {
  // create
  async create({ request, response, view, params }) {
    console.log('resource:create >> ', params.pid, ' :: ', params.eid)

    const $entry = await use('App/Models/Entry').find(params.eid)
    const $post = await $entry.post().fetch()

    return view.render('resource.create', {
      post: $post.toJSON(),
      entry: $entry.toJSON()
    })
  }

  async store({ request, response, view, params, session }) {
    console.log('resource:store >> ', params.pid, ' :: ', params.eid)

    const $resource = new Resource()

    const $entry = await use('App/Models/Entry').find(params.eid)
    await $entry.resources().save($resource)

    session.flash({ notification: 'Your resource has been created'})

    return response.redirect(`/posts/${params.pid}/edit`)
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
