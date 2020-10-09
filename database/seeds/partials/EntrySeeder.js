'use strict'

/*
|--------------------------------------------------------------------------
| EntrySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class EntrySeeder {
  static async run () {
    await Factory
      .model('App/Models/Entry')
  }
}

module.exports = EntrySeeder
