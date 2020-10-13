'use strict'

/*
|--------------------------------------------------------------------------
| TagSeeder
|--------------------------------------------------------------------------
*/
// DEVNOTE: migrations are performed async including the sql queries/table curation so unless explicitly set there is no assertion of sequential order on the primary key. i.e. expect primary key to be assigned randomly.
//turtle, newt, frog, tortoise, snake, spider, lizard, horse, pony, parrot, budgie, ferrets, mink, Chinchilla, mouse, rat, chipmunk
const MOCK = require('../mocks/tagMock').map( (entry) => ({'name': entry}) )

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class TagSeeder {
  static async run () {
    console.log('3 --> TAG SEEDER')

    await Factory
      .model("App/Models/Tag")
      .createMany(MOCK.length, MOCK)

    // await Database
      // .table('tags')
      // .createMany(MOCK.length, MOCK);
  }
}

module.exports = TagSeeder
