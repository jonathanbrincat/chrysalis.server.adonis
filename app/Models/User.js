'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  // a user hasMany Posts
  posts() {
    return this.hasMany('App/Models/Post') //every user can have many posts
  }

  // a user hasOne Profile
  profile() {
    return this.hasOne('App/Models/Profile') //every user can have one profile
  }

  // a user hasMany Favourite Posts
  favouritePosts() {
    return this.belongsToMany('App/Models/Post').pivotTable('pivot_post_user').withTimestamps()


    //
    // return this.hasMany('App/Models/Post') //.pivotTable('pivot_post_user').withTimestamps()

    // expected return post_id 4 & 5
  }
}

module.exports = User
