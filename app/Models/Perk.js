'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Perk extends Model {
  likes() {
    return this.hasMany('App/Models/Like')
  }
}

module.exports = Perk
