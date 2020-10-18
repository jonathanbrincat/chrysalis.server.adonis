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

  // https://adonisjs.com/docs/4.1/lucid#_hiding_fields
  static get hidden () {
    return ['password']
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
    return this.hasMany('App/Models/Post')
  }

  draft() {
    return this.hasOne('App/Models/Draft')
  }

  // a user hasOne Profile
  profile() {
    return this.hasOne('App/Models/Profile')
  }

  resources() {
    return this.hasMany('App/Models/Resource')
  }

  // a user hasMany Favourite Posts
  favourites() {
    return this.belongsToMany('App/Models/Post').pivotTable('pivot_post_user').withTimestamps()
    // return this.hasMany('App/Models/Post') //.pivotTable('pivot_post_user').withTimestamps()
  }
}

module.exports = User
