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
    console.log('jb :: ', request.all() )

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

    //DEVNOTE: BUG: there is an infuriating bug when there is only one item either entry or resource and your try to
    // access the key's value it is always assigned to 0 instead of the true number
    // the view markup is correct. it must be something is doing to resolve the name=entry[12][title]; maybe because there's only one item it puts it at name=entry[0][title]?
    // this will cause the 'where' clause to fail
    for(const key in entry) {
      // console.log(key, 'entry_id = ', parseInt(key), '::', entry[parseInt(key)])
      // console.log('resource >> ', await entry[parseInt(key)].resource )

      if(isNaN(parseInt(key))) continue

      // const $foo = await auth.user.draft().fetch()
      await $draft.entries()
        .where('id', parseInt(key))
        .update({
          title: entry[parseInt(key)].title,
          // body: entry[parseInt(key)].body
        })

      const $entry = await $draft.entries().where('id', parseInt(key)).first()
      // const $entry = await $foo.entries().where('id', parseInt(key)).first()

      for(const hey in entry[parseInt(key)].resource) {
        // console.log('resource_id = ', parseInt(hey), '::', entry[parseInt(key)].resource[hey])

        if(isNaN(parseInt(hey))) continue

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
