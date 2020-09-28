'use strict'

const PostModel = use('App/Models/Post')
const LikeModel = use('App/Models/Like')

class LikeController {
  async setLike({ request, response, view, params }) {
    const post = await PostModel.find(params.id)

    const like = new LikeModel()

    await post.likes().save(like)

    // https://forum.adonisjs.com/t/relationship-count-after-create/4359/3
    // const count = await post.likes().save(like).getCount()
    // return Object.assign(post.toJSON(), { count })

    return response.redirect('back')
  }
}

module.exports = LikeController
