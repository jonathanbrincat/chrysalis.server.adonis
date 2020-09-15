'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tag extends Model {
  posts() {
    return this.belongsToMany('App/Models/Post').pivotTable('pivot_post_tag').withTimestamps()
  }
}

module.exports = Tag
