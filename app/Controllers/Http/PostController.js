'use strict'

const UserModel = use('App/Models/User')
const PostModel = use('App/Models/Post')
const LikeModel = use('App/Models/Like')
const TagModel = use('App/Models/Tag')

const { validate } = use('Validator')

//DEVNOTE: if(request.format() === 'json') route format would facilitate adonis to run headless and non-headless at the same time.

class PostController {
  async index({ request, response, view, auth }) {
    // const posts = await PostModel.all()
    // const posts = await PostModel.query().orderBy('created_at', 'desc').withCount('likes').fetch()
    const index = request.get().page || 1 //take from querystring param if it exists
    const posts = await PostModel.query().orderBy('created_at', 'desc').with('user').with('tags').withCount('likes').paginate(index, 5)

    //all posts with user favourites
    // const postsWithUserFavourites = await PostModel.query().orderBy('created_at', 'desc').with('user').with('favouriteToUser').paginate(index, 5)
    // return postsWithUserFavourites

    //all user favourites with posts
    // const userFavouritesWithPosts = await UserModel.all()
    // const userFavouritesWithPosts = await UserModel.ids()
    // const userFavouritesWithPosts = await UserModel.query().select('*').with('favouritePosts').fetch()
    // return userFavouritesWithPosts

    // NOTE! user has to be logged in other auth.user will be null
    let currentUserFavouritesWithPosts = []
    if(auth.user) {
      // const currentUserFavouritesWithPosts = await auth.user.favouritePosts().fetch()
      currentUserFavouritesWithPosts = await auth.user.favouritePosts().ids() // will return the current user's favourited post in an array containing their ids
      // return currentUserFavouritesWithPosts
    }

    const tagsModel = await TagModel.all()

    return view.render('posts.index', {
      posts: posts.toJSON(),
      // posts: posts // DEVNOTE: is a mixed object with page JSON + vanillaSerializer collection('rows' property). each row is already serialized data. I think that's how it works
      favourites: Array.from(currentUserFavouritesWithPosts),
      tags: tagsModel.toJSON()
    })
  }

  async show({ request, response, view, params, auth }) {
    // const post = await PostModel.find(params.id)
    const post = await PostModel.query().where('id', '=', params.id).withCount('likes').first() //equivalent to find; find is the shorthand; note '=' can be omitted as equality assumed to be default comparison
    // const post = await PostModel.query().where('id', '=', params.id).with('likes').withCount('likes').first() //with('likes') provisions the relationship in one sql request. this is eager loading as oppose to the lazy loading(executing sql queries as and when needed which can be taxing/wasteful with expensive operations i.e. for loops)

    // NOTE! user has to be logged in other auth.user will be null
    let currentUserFavouritesWithPosts = []
    if(auth.user) {
      // const currentUserFavouritesWithPosts = await auth.user.favouritePosts().fetch()
      currentUserFavouritesWithPosts = await auth.user.favouritePosts().ids() // will return the current user's favourited post in an array containing their ids
      // return currentUserFavouritesWithPosts
    }

    return view.render('posts.show', {
      post: post.toJSON(),
      favourites: Array.from(currentUserFavouritesWithPosts)
    })
  }

  async create({ view }) {
    const tags = await TagModel.all()

    return view.render('posts.create', { tags: tags.toJSON() })
  }

  async store({ request, response, view, session, auth }) {
    // TEMP prevent post if not logged in
    // if(!auth.getUser()) {
    // if(!auth.check()) {
    //   return response.redirect('back')
    // }

    const validation = await validate(request.all(), {
      title: 'required|min:5|max:255',
      body: 'required|min:3',
    })

    if(validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    const post = new PostModel()

    post.title = request.input('title')
    post.body = request.input('body')

    await post.save() // commented because we now save with a relationship
    // await auth.user.posts().save(post)

    await post.tags().attach(request.input('tags') === null ? [] : request.input('tags'))

    const userPost = request.all();
    await auth.user.posts().create({
      title: userPost.title,
      body: userPost.body,
    })

    session.flash({ notification: 'Your post has been created'})

    return response.redirect('/dashboard')
  }

  async edit({ request, response, view, params }) {
    const post = await PostModel.find(params.id)

    const postTags = await post.tags().fetch()

    const tagsModel = await TagModel.all()

    return view.render('posts.edit', {
      post: post.toJSON(),
      postId: params.id,
      postTagsId: postTags.toJSON().map( ({ id }) => id ),
      tags: tagsModel.toJSON()
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

    const post = await PostModel.find(params.id)

    post.title = request.all().title //request.input('title')
    post.body = request.all().body //request.input('body')

    await post.save()

    // 1. suboptimal as detaching all relationships is a wasteful operation if no tags were removed
    // await post.tags().detach()
    // await post.tags().attach(request.input('tags') === null ? [] : request.input('tags'))

    // 2. better solution using .sync() - adonis will handle the comparison
    await post.tags().sync(request.input('tags') === null ? [] : request.input('tags'))

    session.flash({ notification: 'Your post has been updated'})

    return response.redirect('/dashboard')
  }

  async destroy({ request, response, view, session, params }) {
    const post = await PostModel.find(params.id)

    await post.likes().delete() // delete any relational entries alongside operation as they are linked to something that no longer exists
    await post.tags().detach()

    await post.delete()

    session.flash({ notification: 'Your post has been deleted'})

    return response.redirect('back')
  }
}

module.exports = PostController
