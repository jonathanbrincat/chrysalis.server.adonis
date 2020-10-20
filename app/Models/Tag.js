'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tag extends Model {
  static get hidden () {
    return ['created_at', 'updated_at']
  }

  posts() {
    return this.belongsToMany('App/Models/Post').pivotTable('pivot_post_tag').withTimestamps()
  }

  drafts() {
    return this.belongsToMany('App/Models/Drafts', 'tag_id', 'draft_id').pivotTable('pivot_post_tag').withTimestamps()
  }
}

module.exports = Tag
