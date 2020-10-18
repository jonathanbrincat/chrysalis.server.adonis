'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Draft extends Model {
  tags() {
    return this.belongsToMany('App/Models/Tag').pivotTable('pivot_post_tag').withTimestamps()
  }

  user() {
    return this.belongsTo('App/Models/User')
  }

  entries() {
    return this.hasMany('App/Models/Entry')
  }
}

module.exports = Draft
