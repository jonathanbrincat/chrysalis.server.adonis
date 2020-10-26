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

    let $draft = await auth.user.draft().fetch()

    if(!$draft) {
      $draft = new Draft()
      await auth.user.draft().save($draft)
    }

    $draft = await auth.user
      .draft()
      .with('entries.resources')
      .with('tags')
      .fetch()

    const payload = $draft.toJSON()
    payload.tags = payload.tags.map( ({ id }) => id )

    return view.render('posts.create', {
      post: payload,
      tags: await use('App/Models/Tag').all().then( (data) => data.toJSON() )
    })
  }

  // DEVNOTE: this should be update method and 'save' button should call 'draft.update'
  async store({ request, response, view, auth, session }) {
    console.log('request.all() :: ', request.all() )

    if(!auth.user) {
      return response.redirect('back')
    }

    const $draft = await auth.user.draft().fetch()

    // const { title, body } = request.all();
    // $draft.merge({ title, body })
    // await $draft.save($draft)
    // await auth.user.draft().save({title, body})

    await $draft.tags().attach(request.input('tags') === null ? [] : request.input('tags'))

    // const entry = request.only(['entry'])
    let entries = request.collect(['id', 'title', 'body'])
    console.log('jb >> ', entries);

    entries = entries.map( (entry) => {
      const json = Object.entries(entry.resources || {}).reduce( (accum, curr) => {
        curr[1].forEach( (value, i) => {
          accum[i] = Object.assign({}, accum[i], { [curr[0]] : value });
        });

        return accum;
      }, [])

      entry.resources = json

      return entry
    });

    for(const { id, title, body, resources } of entries) {
      await $draft.entries()
        .where('id', id)
        .update({
          title,
          body
        })

      const $entry = await $draft.entries().where('id', id).first()

      for(const [index, { id, description }] of (resources).entries()) {
        await $entry.resources()
          .where('id', id)
          .update({
            filename: `id/10${index}`,
            description,
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
