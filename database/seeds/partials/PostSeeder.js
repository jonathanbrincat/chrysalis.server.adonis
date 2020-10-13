'use strict'

/*
|--------------------------------------------------------------------------
| PostSeeder
|--------------------------------------------------------------------------
*/
// DEVNOTE: migrations are performed async including the sql queries/table curation so unless explicitly set there is no assertion of sequential order on the primary key. i.e. expect primary key to be assigned randomly.
const MOCK = require('../mocks/postMock')
const TAGS = require('../mocks/tagMock')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
// const Database = use('Database')
const PostModel = use('App/Models/Post')

class PostSeeder {
  static async run () {
    console.log('4 --> POST SEEDER')

    //ref example 3
    /*Database.table('posts').delete()
    $json = File::get('database/data/data.json')
    $data = json_decode($json)
    foreach($data as $obj) {
      WestworldCast::create(array(
        'character_name' => $obj->character_name,
        'role' => $obj->role,
        'played_by' => $obj->played_by
       ))
    }*/

    //test 1 - working
    /*for(const post of MOCK) {
      await Factory
        .model('App/Models/Post')
        .create(post)
    }*/

    //test 3 - working
    /*const $posts = await Factory
      .model('App/Models/Post')
      .createMany(MOCK.length, MOCK);*/

    /*for(const post of posts) {
      console.log(post.id)
      const $user = await Factory.model('App/Models/User').make()

      await $user.posts().save(post)
      // await post.user().save($user)
    }*/

    //test 4 - working
    /*//create post
    const $post1 = await Factory.model('App/Models/Post').create()
    //attach tags
    await $post1.tags().attach([1])
    //associate to user
    const User1 = use('App/Models/User')
    const $user1 = await User1.find(1)
    await $post1.user().associate($user1)

    const $post2 = await Factory.model('App/Models/Post').create()
    await $post2.tags().attach([1])
    const User2 = use('App/Models/User')
    const $user2 = await User2.find(2)
    await $post2.user().associate($user2)

    const $post3 = await Factory.model('App/Models/Post').create()
    await $post3.tags().attach([2])
    const User3 = use('App/Models/User')
    const $user3 = await User3.find(1)
    await $post3.user().associate($user3)*/

    //test 5 - working
    //DEVNOTE: I have noticed that migration -> factory -> seeding operations can be very flakey. often if you have declared everything correctlyu and use the right syntax it will fail. when you cut and paste in and save. it miraculously starts working.
    const count = await use('App/Models/User').getCount()
    for(const post of MOCK) {
      //create post
      const $post = await Factory
        .model('App/Models/Post')
        .create(post)

      //attach tags
      const tag_id = await use('App/Models/Tag').query().where('name', post._tag).ids()
      await $post.tags().attach( tag_id )

      //associate to user
      const User = use('App/Models/User')
      const $user = await User.find(Math.ceil(Math.random() * count))
      await $user.posts().save($post)
    }
  }
}

module.exports = PostSeeder

/*
CHEATSHEET

.create()          .make()
.createMany(n)     .makeMany(n)

//hasOne
.create()  //Accepts a normal javascript object and returns the related model instance.
.save()    //The save method expects an instance of the related model.
.update()
.delete()
.sync()? //deprecated?

//hasMany
.create()      //Accepts a normal javascript object and returns the related model instance.
.createMany()  //Accepts an Array of normal javascript object.
.save()        //The save method expects an instance of the related model.
.saveMany()    //Accepts an Array of model instances.
.update()
.delete()
.sync()? //deprecated?


//belongsTo
.associate() //associates two model instances together. Expects a model instance
.dissociate()
.update()
.delete()
.sync()? //deprecated?


//belongsToMany
.create()  //Accepts a normal javascript object and returns the related model instance.
.createMany()  //Accepts an Array of normal javascript object.
.save()    //The save method expects an instance of the related model.
.saveMany()    //Accepts an Array of model instances.
.attach() //Expects an array of identifiers, accepts an optional callback, which receives the pivotModel instance, so that you can add extra attributes inside the pivot table if required.
.detach()
.update()
.delete()
.sync()? //deprecated?


//manyThrough


*/

