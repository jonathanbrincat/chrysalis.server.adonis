'use strict'

const Draft = use('App/Models/Draft')

class DraftController {
  async create({ response, request, view, auth }) {

    //if draft exists then return it's data else create new

    if(!auth.user) {
      return response.redirect('back')
    }

    let $draft = await auth.user
      .draft()
      .with('entries.resources')
      .fetch()

    console.log('isDraft :1: ', $draft)

    if(!$draft) {
      $draft = new Draft()
      await auth.user.draft().save($draft)
    }

    console.log('isDraft :2: ', $draft)

    return view.render('posts.create', {
      post: $draft.toJSON(),
      tags: await use('App/Models/Tag').all().then( (data) => data.toJSON() )
    })
  }

  async store({ request, response, view, auth, session }) {
    // return 'draft store'

    if(!auth.user) {
      return response.redirect('back')
    }

    const { title, body } = request.all();

    // combination of update and store operations!!

    const $draft = await auth.user.draft().fetch()
    $draft.merge({ title, body })
    await $draft.save($draft)

    // const $draft = await auth.user.draft().save({title, body})
    //DEVNOTE; going to be broken because of automagic id mismatch in pivot table -  post_id Vs draft_id
    // await $draft.tags().attach(request.input('tags') === null ? [] : request.input('tags'))  //DEVNOTE: you can't not attach tags until the post is persisted(saved) to the DB as the post ID needs to be generated for the pivot table

    //DEVNOTE: going to be broken because no entries exist in markup and would not be in the post request
    /*for(const [i, entry] of (request.all().entry_title).entries() ) {
      // console.log(i, " :: ", entry )

      let $entry = await $draft.entries().create({
        'title': entry, //request.input('entry_title'),
        'body': 'bar'
      })

      for(const [j,  resource] of request.input('entry_image')[i].entries() ) {
        // console.log(j, " :: ", resource )

        await $entry.resources().create({
          'filename': `id/10${j}`,
          'description': resource,
          'contenttype': 'jpg'
        })
      }
    }*/

    session.flash({ notification: 'Your draft post has been saved'})
  }
}

module.exports = DraftController
