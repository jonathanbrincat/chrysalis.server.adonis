'use strict'

// DEVNOTE: Hardcoded dummy data/model
// const posts = [
//   {title: 'Post one', body: 'This is post one.'},
//   {title: 'Post two', body: 'This is post two.'},
//   {title: 'Post three', body: 'This is post three.'},
// ]

const PostModel = use('App/Models/Post')
const { validate } =  use('Validator')

class PostController {
  async index({ view }) {
    const posts = await PostModel.all()

    // return 'Posts';
    return view.render('posts.index', {
      title: 'Latest Posts',
      // posts
      posts: posts.toJSON(),
    });
  }

  async details({ params, view }) {
    const post = await PostModel.find(params.uid)

    return view.render('posts.details', {
      post: post.toJSON()
    });
  }

  async createSave({ request, response, session }) {
    const validation = await validate(request.all(), {
      title: 'required|min:3|max:255',
      body: 'required|min:3',
    })

    if(validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    const post = new PostModel()

    post.title = request.input('title')
    post.body = request.input('body')

    await post.save()

    session.flash({ notification: 'Post successfully added! '})

    return response.redirect('/posts')
  }

  async create({ view }) {
    return view.render('posts.create')
  }

  async edit({ view, params }) {
    const post = await PostModel.find(params.uid)

    return view.render('posts.edit', {
      post
    })
  }

  async editSave({ request, response, session, params }) {
    const validation = await validate(request.all(), {
      title: 'required|min:3|max:255',
      body: 'required|min:3',
    })

    if(validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    const post = await PostModel.find(params.uid)

    post.title = request.input('title')
    post.body = request.input('body')

    await post.save()

    session.flash({ notification: 'Post successfully updated! '})

    return response.redirect('/posts')
  }

  async delete({ request, response, session, params }) {
    const post = await PostModel.find(params.uid)

    await post.delete();

    session.flash({ notification: 'Post successfully deleted! '})

    return response.redirect('/posts')
  }
}

module.exports = PostController
