'use strict'

const Resource = use('App/Models/Resource')

class ResourceController {
  async create({ request, response, view, params }) {
    // console.log('resource:create >> ', params.id, ' :: ', params.eid)

    const $entry = await use('App/Models/Entry').find(params.eid)
    const $post = await $entry.post().fetch()

    return view.render('resource.create', {
      post: $post.toJSON(),
      entry: $entry.toJSON()
    })
  }

  async store({ request, response, view, params, session }) {
    // console.log('resource:store >> ', params.id, ' :: ', params.eid)

    const $resource = new Resource()

    const $entry = await use('App/Models/Entry').find(params.eid)
    await $entry.resources().save($resource)

    session.flash({ notification: 'Your resource has been created'})

    return response.redirect(`/posts/${params.id}/edit`)
  }

  async destroy({ request, response, view, params, session }) {
    // console.log('resource:destroy >> ', params.id)

    const $resource = await Resource.find(params.id)

    await $resource.delete()

    session.flash({ notification: 'The resource has been deleted'})

    return response.redirect('back')
  }
}

module.exports = ResourceController
