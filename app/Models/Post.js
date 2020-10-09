'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {

  //DEVNOTE: mocking a database source with framework's built-in session service
  /*getPosts(session) {
    if(!session.get('posts')) {
      this.createDummyData(session)
    }

    return session.get('posts')
  }

  createDummyData(session) {
    const posts = [
      {
        'title': 'Learning Laravel',
        'content': 'This blog post will get you right on track with Laravel!'
      },
      {
        'title': 'Something else',
        'content': 'Some other content'
      }
    ]

    session.put('posts', posts)
  }*/

  // a Post hasMany Likes -> one to many
  likes() {
    return this.hasMany('App/Models/Like')
  }
  //.getCount()

  // a Post belongsToMany Tags -> many to many
  tags() {
    return this.belongsToMany('App/Models/Tag').pivotTable('pivot_post_tag').withTimestamps()
  }

  // a Post belongsTo a User -> many to one
  user() {
    return this.belongsTo('App/Models/User')
  }

  //hasOne
  //hasMany
  //belongsTo
  //belongsToMany
  //manyThrough

  // A Post belongsToMany user favourites
  // A Post hasOne user favourite
  // userFavourite() {
  favouriteToUser() {
    return this.belongsToMany('App/Models/User').pivotTable('pivot_post_user').withTimestamps()


    //
    // return this.hasMany('App/Models/User')//.pivotTable('pivot_post_user').withTimestamps()
    // return this.hasOne('App/Models/User').pivotTable('pivot_post_user').withTimestamps()
  }

  entries() {
    return this.hasMany('App/Models/Entry')
  }

  // MUTATOR(setter) - is for intercepting and acting upon data before storing it in the database. this is a one-way operation. can not be reversed once the change is made.
  // NOTE: it is the naming schema that defines this as a mutator in a Model. 'set' followed by the 'property'/field you want to change(camel-case) i.e. setXXX. and return the mutation
  // the call is infered. It will be automatically called whenever the property is set/assigned. no need to call(effectively a setter in a getter/setter pattern)
  /*
  setTitle(value) {
    //overide property - fyi you can override any property but this would be a bad practise as it obscures/distorts functionality
    // (effectively a getter in a getter/setter pattern)
    return value.toLowerCase()
  }

  // ACCESSOR(getter) - is for intercepting and action upon data outputted from database. It is a transformation because the change does not get stored/retained.
  getTitle(value) {
    return value.toUpperCase()
  }
  */

  // COMPUTED EXAMPLE
  static get computed () {
    return ['titleAndDate', 'foobar']
  }

  getTitleAndDate({ title, updated_at }) {
    return `${title} ${updated_at}`
  }
}

module.exports = Post
