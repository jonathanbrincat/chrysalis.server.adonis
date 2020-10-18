'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Entry extends Model {
  draft() {
    return this.belongsTo('App/Models/Draft')
  }

  post() {
    return this.belongsTo('App/Models/Post')
  }

  resources() {
    return this.hasMany('App/Models/Resource')
  }
}

module.exports = Entry
