'use strict'

/*
|--------------------------------------------------------------------------
| PostSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
// const PostModel = use('App/Models/Post')

class PostSeeder {
  async run () {
    /*const post1 = new PostModel()
    post1.title = 'Learning Laravel'
    post1.content = 'This blog post will get you right on track with Laravel!'
    post1.user_id = 1

    await post1.save()

    const post2 = new PostModel()
    post2.title = 'Learning Adonis'
    post2.content = 'Learning Laravel to learn Adonis!'
    post2.user_id = 1

    await post2.save()*/

    const posts = await Factory
      .model("App/Models/Post")
      .createMany(12);
  }
}

module.exports = PostSeeder
