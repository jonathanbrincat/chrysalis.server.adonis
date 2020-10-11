'use strict'

const MOCK = [
  {
    'username': 'jon',
    'email': 'jon@local.host'
  },
  {
    'username': 'bob',
    'email': 'bob@local.host'
  },
  {
    'username': 'mary',
    'email': 'mary@local.host'
  },
  {
    'username': 'sue',
    'email': 'sue@local.host'
  }
]

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
  static async run () {
    console.log('1 --> USER SEEDER')

    /*await Factory
      .model('App/Models/User')
      .createMany(MOCK.length, MOCK)*/

    for(const user of MOCK) {
      //create user
      let $user = await Factory
        .model('App/Models/User')
        .create(user)

      //associate to profile
      let $profile = await Factory
        .model('App/Models/Profile')
        .create()

      $user.profile().save($profile)
    }

  }
}

module.exports = UserSeeder
