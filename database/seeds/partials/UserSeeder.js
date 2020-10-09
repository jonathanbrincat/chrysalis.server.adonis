'use strict'

const mock = [
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
// const Database = use('Database')

class UserSeeder {
  static async run () {
    console.log('1 --> USER SEEDER')

    // const $users = await Database.table('users')
    // console.log($users);

    await Factory
      .model('App/Models/User')
      .createMany(mock.length, mock)
  }
}

module.exports = UserSeeder
