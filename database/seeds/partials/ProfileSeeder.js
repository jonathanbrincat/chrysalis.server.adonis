'use strict'

/*
|--------------------------------------------------------------------------
| ProfileSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ProfileSeeder {
  static async run () {
    console.log('2 --> PROFILE SEEDER')

    await Factory
      .model('App/Models/Profile')
  }
}

module.exports = ProfileSeeder
