'use strict'

const Database = use('Database')

const Post = use('App/Models/Post')
const Entry = use('App/Models/Entry')
const Tag = use('App/Models/Tag')

const { validate } = use('Validator')

//DEVNOTE: if(request.format() === 'json') route format would facilitate adonis to run headless and non-headless at the same time.

class PostController {
  async index({ request, response, view, auth }) {
    const ordering = ['created_at', 'desc']
    const resultsPerPage = 5

    const index = request.get().page || 1 //take from querystring param if it exists
    const $posts = await Post.query()
      .orderBy(...ordering)
      .with('user')
      .with('tags')
      .withCount('likes')
      .paginate(index, resultsPerPage)

    // DEVNOTE: user has to be logged in other auth.user will be null
    let favourites_id = []
    if(auth.user) {
      favourites_id = await auth.user.favourites().ids() // will return the current user's favourited post in an array containing their ids
    }

    const $tags = await Tag.all()

    return view.render('posts.index', {
      posts: $posts.toJSON(), // DEVNOTE: is a mixed object with page JSON + vanillaSerializer collection('rows' property). each row is already serialized data. I think that's how it works
      tags: $tags.toJSON(),
      favourites: Array.from(favourites_id)
    })
  }

  async show({ request, response, view, params, auth }) {
    const $post = await Post.query().where('id', params.id).withCount('likes').first() //equivalent to find() being shorthand method - need to expand so fully qualified query() used and chained; note '=' can be omitted as equality assumed to be default comparison //with('likes') provisions the relationship in one sql request. this is eager loading as oppose to the lazy loading(executing sql queries as and when needed which can be taxing/wasteful with expensive operations i.e. for loops)
    const $entries = await $post.entries().with('resources').fetch()

    let currentUserFavouritesWithPosts = []
    if(auth.user) {
      currentUserFavouritesWithPosts = await auth.user.favourites().ids() // convenience method; will return the current user's favourited post in an array containing their ids
    }

    return view.render('posts.show', {
      post: $post.toJSON(),
      entries: $entries.toJSON(),
      favourites: Array.from(currentUserFavouritesWithPosts)
    })
  }

  async create({ view }) {
    return view.render('posts.create', {
      tags: await Tag.all().then( (data) => data.toJSON() )
    })
  }

  async store({ request, response, view, session, auth }) {
    // console.log('jb :: ', request.all() )

    if(!auth.user) {
      return response.redirect('back')
    }

    // const validation = await validate(request.all(), {
    //   title: 'required|min:5|max:255',
    //   body: 'required|min:3',
    // })

    // if(validation.fails()) {
    //   session.withErrors(validation.messages()).flashAll()
    //   return response.redirect('back')
    // }

    const { title, body } = request.all();

    /*
    // METHOD 1
    const $post = new Post()
    $post.title = request.input('title')
    $post.body = request.input('body')
    await auth.user.posts().save($post)
    await $post.tags().attach(request.input('tags') === null ? [] : request.input('tags')) //DEVNOTE: you can't not attach tags until the post is persisted(saved) to the DB as the post ID needs to be generated for the pivot table
    */

    // METHOD 2
    const $post = await auth.user.posts().create({title, body})
    await $post.tags().attach(request.input('tags') === null ? [] : request.input('tags'))  //DEVNOTE: you can't not attach tags until the post is persisted(saved) to the DB as the post ID needs to be generated for the pivot table

    for(const [i, entry] of (request.all().entry_title).entries() ) {
      // console.log(i, " :: ", entry )

      let $entry = await $post.entries().create({
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
    }

    // for(const [i, resource] of (request.all().entry_image).entries() ) {
    //   console.log(i, " :: ", resource )
    // }

    session.flash({ notification: 'Your post has been created'})

    return response.redirect('dashboard')
  }

  async edit({ request, response, view, params }) {
    const post = await Post
      .query()
      .where('id', params.id)
      .with('entries.resources')
      .with('tags')
      .first()

    const payload = post.toJSON()
    payload.tags = payload.tags.map( ({ id }) => id )

    return view.render('posts.edit', {
      post: payload,
      tags: await Tag.all().then( (data) => data.toJSON())
    })
  }

  async update({ request, response, view, session, params }) {
    const validation = await validate(request.all(), {
      title: 'required|min:5|max:255',
      body: 'required|min:3',
    })

    if(validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    const { title, body } = request.all();

    const $post = await Post.find(params.id)

    $post.title = title   //request.input('title')
    $post.body = body     //request.input('body')

    await $post.save()

    // 1. suboptimal as detaching all relationships is a wasteful operation if no tags were removed
    // await $post.tags().detach()
    // await $post.tags().attach(request.input('tags') === null ? [] : request.input('tags'))

    // 2. better solution using .sync() - adonis will handle the comparison
    await $post.tags().sync(request.input('tags') === null ? [] : request.input('tags'))

    //await $post.entries().sync($entry)
    //await $post.entries().$resources.sync($resources)

    session.flash({ notification: 'Your post has been updated'})

    return response.redirect('dashboard.index')
  }

  async destroy({ request, response, view, session, params }) {
    const $post = await Post.find(params.id)

    await $post.likes().delete() // delete any relational entries alongside operation as they are linked to something that no longer exists
    await $post.tags().detach()

    await $post.delete()

    session.flash({ notification: 'Your post has been deleted'})

    return response.redirect('back')
  }
}

module.exports = PostController
