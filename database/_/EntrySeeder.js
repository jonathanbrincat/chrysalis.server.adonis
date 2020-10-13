'use strict'

/*
|--------------------------------------------------------------------------
| EntrySeeder
|--------------------------------------------------------------------------
*/
const MOCK = require('./mocks/entryMock')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class EntrySeeder {
  async run () {
    for(const [i, entry] of MOCK.entries()) {
      // console.log(i, ' :: ', entry)

      const $entry = await Factory
        .model('App/Models/Entry')
        .create(entry)

      // const $post = await use('App/Models/Post').query().where('id', entry._post_id).fetch() // DEVNOTE: doesn't seem to return Lucid object as methods missing
      const $post = await use('App/Models/Post').findOrFail(entry._post_id) //status method
      // console.log(i, ' >> ', $post)
      // await $entry.post().associate($post) //belongsTo

      await $post.entries().save($entry) //hasMany
    }
  }
}

module.exports = EntrySeeder
