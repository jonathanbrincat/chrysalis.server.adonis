'use strict'

const UserModel = use('App/Models/User')
const PostModel = use('App/Models/Post')
const LikeModel = use('App/Models/Like')
const TagModel = use('App/Models/Tag')

const { validate } = use('Validator')

//DEVNOTE: if(request.format() === 'json') route format would facilitate adonis to run headless and non-headless at the same time.

/*
// This...
Route.resource('posts', 'PostController')

// ...equates to this:
Route.get('posts', 'PostController.index').as('posts.index')
Route.post('posts', 'PostController.store').as('posts.store')
Route.get('posts/create', 'PostController.create').as('posts.create')
Route.get('posts/:id', 'PostController.show').as('posts.show')
Route.put('posts/:id', 'PostController.update').as('posts.update')
Route.patch('posts/:id', 'PostController.update')
Route.get('posts/:id/edit', 'PostController.edit').as('posts.edit')
Route.delete('posts/:id', 'PostController.destroy').as('posts.destroy')
*/

class PostController {
  async getPosts({ request, response, view, auth }) {
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

    return view.render('posts.index', {
      posts: posts.toJSON(),
      // posts: posts // DEVNOTE: is a mixed object with page JSON + vanillaSerializer collection('rows' property). each row is already serialized data. I think that's how it works
      favourites: Array.from(currentUserFavouritesWithPosts)
    })
  }

  async read({ request, response, view, params }) {
    // const post = await PostModel.find(params.id)
    const post = await PostModel.query().where('id', '=', params.id).withCount('likes').first() //equivalent to find; find is the shorthand; note '=' can be omitted as equality assumed to be default comparison
    // const post = await PostModel.query().where('id', '=', params.id).with('likes').withCount('likes').first() //with('likes') provisions the relationship in one sql request. this is eager loading as oppose to the lazy loading(executing sql queries as and when needed which can be taxing/wasteful with expensive operations i.e. for loops)

    return view.render('post.index', {
      post: post.toJSON()
    })
  }

  async getCreate({ view }) {
    const tags = await TagModel.all()

    return view.render('post.create', { tags: tags.toJSON() })
  }

  async getUpdate({ request, response, view, params }) {
    const post = await PostModel.find(params.id)

    const postTags = await post.tags().fetch()

    const tagsModel = await TagModel.all()

    return view.render('post.edit', {
      post: post.toJSON(),
      postId: params.id,
      postTagsId: postTags.toJSON().map( ({ id }) => id ),
      tags: tagsModel.toJSON()
    })
  }

  async create({ request, response, view, session, auth }) {
    // TEMP prevent post if not logged in
    // if(!auth.getUser()) {
    // if(!auth.check()) {
    //   return response.redirect('back')
    // }

    const validation = await validate(request.all(), {
      title: 'required|min:5|max:255',
      content: 'required|min:3',
    })

    if(validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    const Post = new PostModel()

    Post.title = request.input('title')
    Post.content = request.input('content')

    await Post.save() // commented because we now save with a relationship
    // await auth.user.posts().save(Post)

    await Post.tags().attach(request.input('tags') === null ? [] : request.input('tags'))

    const userPost = request.all();
    await auth.user.posts().create({
      title: userPost.title,
      content: userPost.content,
    })

    session.flash({ notification: 'Your post has been created'})

    return response.redirect('/dashboard')
  }

  async update({ request, response, view, session, params }) {
    const validation = await validate(request.all(), {
      title: 'required|min:5|max:255',
      content: 'required|min:3',
    })

    if(validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    const post = await PostModel.find(params.id)

    post.title = request.all().title //request.input('title')
    post.content = request.all().content //request.input('content')

    await post.save()

    // 1. suboptimal as detaching all relationships is a wasteful operation if no tags were removed
    // await post.tags().detach()
    // await post.tags().attach(request.input('tags') === null ? [] : request.input('tags'))

    // 2. better solution using .sync() - adonis will handle the comparison
    await post.tags().sync(request.input('tags') === null ? [] : request.input('tags'))

    session.flash({ notification: 'Your post has been updated'})

    return response.redirect('/dashboard')
  }

  async delete({ request, response, view, session, params }) {
    const post = await PostModel.find(params.id)

    await post.likes().delete() // delete any relational entries alongside operation as they are linked to something that no longer exists
    await post.tags().detach()

    await post.delete()

    session.flash({ notification: 'Your post has been deleted'})

    return response.redirect('back')
  }
}

module.exports = PostController
