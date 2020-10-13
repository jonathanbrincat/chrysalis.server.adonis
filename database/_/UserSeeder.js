'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
*/
const MOCK = require('./mocks/userMock')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
  async run () {
    console.log('1 --> foo USER SEEDER')

    /*await Factory
      .model('App/Models/User')
      .createMany(MOCK.length, MOCK)*/

    for(const user of MOCK) {
      console.log('jb >> ', user)
      //create user
      let $user = await Factory
        .model('App/Models/User')
        .create(user)

      //associate to profile
      let $profile = await Factory
        .model('App/Models/Profile')
        .create()
      console.log('profile >> ', $profile.toJSON())

      $user.profile().save($profile)
    }

  }
}

module.exports = UserSeeder
