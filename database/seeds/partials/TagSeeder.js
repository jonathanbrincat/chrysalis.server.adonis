'use strict'

/*
|--------------------------------------------------------------------------
| TagSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

//turtle, newt, frog, tortoise, snake, spider, lizard, horse, pony, parrot, budgie, ferrets, mink, Chinchilla, mouse, rat, chipmunk
const mock = ['cat', 'dog', 'rabbit', 'hamster', 'gerbil', 'guinea pig', 'rodent', 'aviary', 'fowl', 'fish', 'reptile', 'amphibians'].map( (entry) => ({'name': entry}) )

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
// const Database = use('Database')
// const TagModel = use('App/Models/Tag')

class TagSeeder {
  static async run () {
    console.log('2 --> TAG SEEDER')

    //test 1 - working
    /*for(const item of mock) {
      const $foo = new TagModel()
      $foo.name = item

      await $foo.save()

      // await Database.table('tags').insert({name: item})
    }*/

    //test 2 - working
    await Factory
      .model("App/Models/Tag")
      .createMany(mock.length, mock)

    // await Database
      // .table('tags')
      // .createMany(mock.length, mock);
  }
}

module.exports = TagSeeder
