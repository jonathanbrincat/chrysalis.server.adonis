'use strict'

const PostModel = use('App/Models/Post')
const LikeModel = use('App/Models/Like')
const TagModel = use('App/Models/Tag')

const { validate } = use('Validator')

class PostController {
  async getIndex({ request, response, view }) {
    // const posts = await PostModel.all()
    // const posts = await PostModel.query().orderBy('created_at', 'desc').withCount('likes').fetch()

    // https://github.com/adonisjs/lucid/issues/347
    // https://forum.adonisjs.com/t/please-help-me-with-adonisjs-pagination/4648
    // https://mauricius.dev/effective-pagination-in-adonisjs/
    const index = request.get().page || 1 //take from querystring param if it exists
    const posts = await PostModel.query().orderBy('created_at', 'desc').withCount('likes').paginate(index, 5) // DEVNOTE: with adonis pagination. paginate(page to fetch results, page size limit) // need to provide the page to get value e.g. example.com/articles?page=2.

    return view.render('blog.index', {
      posts: posts.toJSON()
      // posts: posts // DEVNOTE: is a mixed object with page JSON + vanillaSerializer collection('rows' property). each row is already serialized data. I think that's how it works
    })
  }

  async getAdminIndex({ request, response, view }) {
    // const posts = await PostModel.all()
    const posts = await PostModel.query().orderBy('title', 'asc').fetch()

    return view.render('admin.index', {
      posts: posts.toJSON()
    })
  }

  async getPost({ request, response, view, params }) {
    // const post = await PostModel.find(params.id)
    const post = await PostModel.query().where('id', '=', params.id).withCount('likes').first() //equivalent to find; find is the shorthand; note '=' can be omitted as equality assumed to be default comparison
    // const post = await PostModel.query().where('id', '=', params.id).with('likes').withCount('likes').first() //with('likes') provisions the relationship in one sql request. this is eager loading as oppose to the lazy loading(executing sql queries as and when needed which can be taxing/wasteful with expensive operations i.e. for loops)

    return view.render('blog.post', {
      post: post.toJSON()
    })
  }

  async getLike({ request, response, view, params }) {
    const post = await PostModel.find(params.id)

    const like = new LikeModel()

    await post.likes().save(like)

    // https://forum.adonisjs.com/t/relationship-count-after-create/4359/3
    // const count = await post.likes().save(like).getCount()
    // return Object.assign(post.toJSON(), { count })

    return response.redirect('back')
  }

  async getAdminCreate({ view }) {
    const tags = await TagModel.all()

    return view.render('admin.create', { tags: tags.toJSON() })
  }

  async getAdminEdit({ request, response, view, params }) {
    const post = await PostModel.find(params.id)

    const tags = await TagModel.all()

    return view.render('admin.edit', {
      post: post.toJSON(),
      postId: params.id,
      tags: tags.toJSON()
    })
  }

  async postAdminCreate({ request, response, view, session, auth }) {
    const validation = await validate(request.all(), {
      title: 'required|min:5',
      content: 'required|min:10',
    })

    // TEMP prevent post if not logged in
    // if(!auth.getUser()) {
    // if(!auth.check()) {
    //   return response.redirect('back')
    // }

    const Post = new PostModel()

    Post.title = request.input('title')
    Post.content = request.input('content')

    await Post.save() // commented because we now save with a relationship
    // await auth.user.posts().save(Post)

    await Post.tags().attach(request.input('tags') === null ? [] : request.input('tags'))

    session.flash({ info: 'Your post has been created'})

    return response.redirect('/admin')
  }

  async postAdminUpdate({ request, response, view, session, params }) {
    // const validation = await validate(request.all(), {
    //   title: 'required|min:5',
    //   content: 'required|min:10',
    // })

    const post = await PostModel.find(params.id)

    post.title = request.all().title
    post.content = request.all().content

    await post.save()

    // 1. suboptimal as detaching all relationships is a wasteful operation if no tags were removed
    // await post.tags().detach()
    // await post.tags().attach(request.input('tags') === null ? [] : request.input('tags'))

    // 2. better solution using .sync() - adonis will handle the comparison
    await post.tags().sync(request.input('tags') === null ? [] : request.input('tags'))

    session.flash({ info: 'Your post has been updated'})

    return response.redirect('/admin')
  }

  async getAdminDelete({ request, response, view, session, params }) {
    const post = await PostModel.find(params.id)

    await post.likes().delete() // delete any relational entries alongside operation as they are linked to something that no longer exists

    await post.tags().detach()

    await post.delete()

    session.flash({ info: 'Your post has been deleted'})

    return response.redirect('back')
  }
}

module.exports = PostController
