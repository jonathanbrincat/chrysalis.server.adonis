'use strict'

const UserModel = use('App/Models/User')
const PostModel = use('App/Models/Post')
const LikeModel = use('App/Models/Like')
const TagModel = use('App/Models/Tag')

const { validate } = use('Validator')

class PostController {
  async getPosts({ request, response, view, auth }) {
    // const posts = await PostModel.all()
    // const posts = await PostModel.query().orderBy('created_at', 'desc').withCount('likes').fetch()
    const index = request.get().page || 1 //take from querystring param if it exists
    const posts = await PostModel.query().orderBy('created_at', 'desc').with('user').with('tags').withCount('likes').paginate(index, 5)

    //all posts with user favourites
    const postsWithUserFavourites = await PostModel.query().orderBy('created_at', 'desc').with('user').with('favouriteToUser').paginate(index, 5)
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

  async getAdminPosts({ request, response, view, auth }) {
    // const posts = await PostModel.all()
    const posts = await PostModel.query().orderBy('title', 'asc').fetch()
    const userPosts = await auth.user.posts().fetch()

    //get current user favourite posts
    const currentUserFavouritesWithPosts = await auth.user.favouritePosts().fetch()
    // return currentUserFavouritesWithPosts

    //get users who have favourited current post
    //has current user favourited current post //get current post favourite user

    return view.render('admin.index', {
      posts: posts.toJSON(),
      userPosts: userPosts.toJSON(),
      favouritePosts: currentUserFavouritesWithPosts.toJSON()
    })
  }

  async getPost({ request, response, view, params }) {
    // const post = await PostModel.find(params.id)
    const post = await PostModel.query().where('id', '=', params.id).withCount('likes').first() //equivalent to find; find is the shorthand; note '=' can be omitted as equality assumed to be default comparison
    // const post = await PostModel.query().where('id', '=', params.id).with('likes').withCount('likes').first() //with('likes') provisions the relationship in one sql request. this is eager loading as oppose to the lazy loading(executing sql queries as and when needed which can be taxing/wasteful with expensive operations i.e. for loops)

    return view.render('posts.post', {
      post: post.toJSON()
    })
  }

  async getAdminCreate({ view }) {
    const tags = await TagModel.all()

    return view.render('admin.create', { tags: tags.toJSON() })
  }

  async getAdminEdit({ request, response, view, params }) {
    const post = await PostModel.find(params.id)

    const postTags = await post.tags().fetch()
    // console.log('postTags :: ', postTags.toJSON());

    const tagsModel = await TagModel.all()

    return view.render('admin.edit', {
      post: post.toJSON(),
      postId: params.id,
      // postTags: postTags.toJSON(),
      postTagsId: postTags.toJSON().map( ({ id }) => id ),
      tags: tagsModel.toJSON()
    })
  }

  async postAdminCreate({ request, response, view, session, auth }) {
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

    return response.redirect('/admin')
  }

  async postAdminUpdate({ request, response, view, session, params }) {
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

    return response.redirect('/admin')
  }

  async getAdminDelete({ request, response, view, session, params }) {
    const post = await PostModel.find(params.id)

    await post.likes().delete() // delete any relational entries alongside operation as they are linked to something that no longer exists
    await post.tags().detach()

    await post.delete()

    session.flash({ notification: 'Your post has been deleted'})

    return response.redirect('back')
  }

  async setLike({ request, response, view, params }) {
    const post = await PostModel.find(params.id)

    const like = new LikeModel()

    await post.likes().save(like)

    // https://forum.adonisjs.com/t/relationship-count-after-create/4359/3
    // const count = await post.likes().save(like).getCount()
    // return Object.assign(post.toJSON(), { count })

    return response.redirect('back')
  }

  async getFavourite({ request, response, view, params, auth }) {
    // const userFavourites = await auth.user.favouritePosts().fetch()
    const userId = await auth.user.id
    // const user = await UserModel.find(userId)
    const user = await UserModel.query().where('id', '=', userId).with('favouritePosts').fetch()
    // const fav = await user.query().with('favouritePosts').fetch()

    // return userFavourites

    return user
    return view.render('admin.favourites', { foo: user })
  }

  // A User can have MANY favourite posts
  // A favourite post can belong to one User(owner)
  async setFavourite({ request, response, view, params, auth }) {
    const post = await PostModel.find(params.id)

    return response.redirect('back')
  }
}

module.exports = PostController
