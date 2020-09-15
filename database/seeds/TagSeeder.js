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

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const TagModel = use('App/Models/Tag')

class TagSeeder {
  async run () {
    const tag1 = new TagModel()
    tag1.name = 'Tutorial'

    await tag1.save()

    const tag2 = new TagModel()
    tag2.name = 'Industry News'

    await tag2.save()
  }
}

module.exports = TagSeeder
