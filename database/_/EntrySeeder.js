'use strict'

/*
|--------------------------------------------------------------------------
| EntrySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const MOCK = [
  {
    'title': 'Kitten 1',
    'body': '',
    'name': '',
    'sex': '',
    'age': 21, //in days
    'colour': '',
    'type': '',
    'is_registered': false,
    'is_available': true,
    '_post_id': 1
  },
  {
    'title': 'Kitten 2',
    'body': '',
    'name': '',
    'sex': '',
    'age': 21,
    'colour': '',
    'type': '',
    'is_registered': false,
    'is_available': true,
    '_post_id': 1
  },
  {
    'title': 'Kitten 1',
    'body': '',
    'name': '',
    'sex': '',
    'age': 3,
    'colour': '',
    'type': '',
    'is_registered': false,
    'is_available': true,
    '_post_id': 2
  },
  {
    'title': 'Kitten 2',
    'body': '',
    'name': '',
    'sex': '',
    'age': 3,
    'colour': '',
    'type': '',
    'is_registered': false,
    'is_available': true,
    '_post_id': 2
  },
  {
    'title': 'Kitten 3',
    'body': '',
    'name': '',
    'sex': '',
    'age': 3,
    'colour': '',
    'type': '',
    'is_registered': false,
    'is_available': true,
    '_post_id': 2
  },
]

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
