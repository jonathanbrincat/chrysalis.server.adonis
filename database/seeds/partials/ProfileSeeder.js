'use strict'

/*
|--------------------------------------------------------------------------
| ProfileSeeder
|--------------------------------------------------------------------------
*/
const MOCK = require('../mocks/profileMock')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ProfileSeeder {
  static async run () {
    console.log('2 --> PROFILE SEEDER')

    const $users = await use('App/Models/User').all()

    for( const [i, $user] of ($users.rows).entries() ) {
      // console.log(i, ' >> ', $user)

      const $profile = await Factory
        .model('App/Models/Profile')
        .make(MOCK[i])

      await $user.profile().save($profile)
    }

    /*
    for(const profile of MOCK) {
      // console.log('profile > ', profile)

      //create profile
      const $profile = await Factory
        .model('App/Models/Profile')
        .create(profile)

      //create user
      const $user = await Factory
        .model('App/Models/User')
        .make(user)

      $profile.user().save($user)
    }
    */
  }
}

module.exports = ProfileSeeder
