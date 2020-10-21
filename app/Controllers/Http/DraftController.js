'use strict'

const Draft = use('App/Models/Draft')

class DraftController {
  async index() {}

  async show() {}

  // DEVNOTE: this should be store method and route should be to 'draft.store'
  async create({ response, request, view, auth }) {

    if(!auth.user) {
      return response.redirect('back')
    }

    let $draft = await auth.user
      .draft()
      .with('entries.resources')
      .with('tags')
      .fetch()

    if(!$draft) {
      $draft = new Draft()
      await auth.user.draft().save($draft)
    }

    const payload = $draft.toJSON()
    payload.tags = payload.tags.map( ({ id }) => id )

    return view.render('posts.create', {
      post: payload,
      tags: await use('App/Models/Tag').all().then( (data) => data.toJSON() )
    })
  }

  // DEVNOTE: this should be update method and 'save' button should call 'draft.update'
  async store({ request, response, view, auth, session }) {
    // console.log('jb :: ', request.all() )

    if(!auth.user) {
      return response.redirect('back')
    }

    const { title, body } = request.all();

    const $draft = await auth.user.draft().fetch()

    $draft.merge({ title, body })
    await $draft.save($draft)
    // await auth.user.draft().save({title, body})

    await $draft.tags().attach(request.input('tags') === null ? [] : request.input('tags'))

    //DEVNOTE: going to be broken because no entries exist in markup and would not be in the post request - rememeber this was ripped from update which assumes data is entered
    const { entry } = request.only(['entry'])

    for(const key in entry) {
      // console.log('entry_id = ', parseInt(key), '::', entry[parseInt(key)])
      // console.log('resource >> ', await entry[parseInt(key)].resource )

      await $draft.entries()
        .where('id', parseInt(key))
        .update({
          title: entry[parseInt(key)].title,
          // body: entry[parseInt(key)].body
        })

      const $entry = await $post.entries().where('id', key).first()

      for(const hey in entry[parseInt(key)].resource) {
        // console.log('resource_id = ', parseInt(hey), '::', entry[parseInt(key)].resource[hey])

        await $entry.resources()
          .where('id', parseInt(hey))
          .update({
            // filename: `id/10${k}`,
            description: entry[parseInt(key)].resource[hey],
            contenttype: 'jpg'
          })
      }
    }

    session.flash({ notification: 'Your draft post has been saved'})
  }

  async edit() {}

  async update() {}

  async destroy() {}
}

module.exports = DraftController
