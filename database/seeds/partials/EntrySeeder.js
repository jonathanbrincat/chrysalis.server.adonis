'use strict'

/*
|--------------------------------------------------------------------------
| EntrySeeder
|--------------------------------------------------------------------------
*/
const MOCK = require('../mocks/entryMock')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class EntrySeeder {
  static async run () {
    console.log('5 --> ENTRY SEEDER')

    for(const [i, entry] of MOCK.entries()) {
      const $entry = await Factory
        .model('App/Models/Entry')
        .create(entry)

      // const $post = await use('App/Models/Post').query().where('id', entry._post_id).fetch() // DEVNOTE: doesn't seem to return Lucid object as methods missing
      const $post = await use('App/Models/Post').findOrFail(entry._post_id) //status method
      // await $entry.post().associate($post) //belongsTo

      await $post.entries().save($entry) //hasMany
    }
  }
}

module.exports = EntrySeeder
