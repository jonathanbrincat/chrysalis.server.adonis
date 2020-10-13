'use strict'

/*
|--------------------------------------------------------------------------
| ResourceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const MOCK = [
  {
    'filename': 'id/101',
    'description': 'British Shorthair Kitten 1 - Image 1',
    'contenttype': 'jpg',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 1,
    '_user_id': 2 //DEVNOTE: PostSeeder assigns this with random number generator
  },
  {
    'filename': 'id/102',
    'description': 'British Shorthair Kitten 1 - Image 2',
    'contenttype': 'jpg',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 1,
    '_user_id': 2
  },
  {
    'filename': 'id/103',
    'description': 'British Shorthair Kitten 1 - Image 3',
    'contenttype': 'jpg',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 1,
    '_user_id': 2
  },
  {
    'filename': 'id/104',
    'description': 'British Shorthair Kitten 1 - Image 4',
    'contenttype': 'jpg',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 1,
    '_user_id': 2
  },
  {
    'filename': 'id/106',
    'description': 'British Shorthair Kitten 1 - Image 5',
    'contenttype': 'jpg',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 1,
    '_user_id': 2
  },
  {
    'filename': 'id/111',
    'description': 'British Shorthair  Kitten 2 - Image 1',
    'contenttype': 'png',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 2,
    '_user_id': 2
  },
  {
    'filename': 'id/112',
    'description': 'British Shorthair  Kitten 2 - Image 2',
    'contenttype': 'png',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 2,
    '_user_id': 2
  },
  {
    'filename': 'id/113',
    'description': 'British Shorthair  Kitten 2 - Image 3',
    'contenttype': 'png',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 2,
    '_user_id': 2
  },
  {
    'filename': 'id/201',
    'description': 'Marble Bengal Kitten 1 - Image 1',
    'contenttype': 'jpg',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 3,
    '_user_id': 4
  },
  {
    'filename': 'id/202',
    'description': 'Marble Bengal Kitten 1 - Image 2',
    'contenttype': 'jpg',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 3,
    '_user_id': 4
  },
  {
    'filename': 'id/211',
    'description': 'Spotted Bengal Kitten 2 - Image 1',
    'contenttype': 'jpg',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 4,
    '_user_id': 4
  },
  {
    'filename': 'id/221',
    'description': 'Rosette Bengal Kitten 3 - Image 1',
    'contenttype': 'jpg',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 5,
    '_user_id': 4
  },
  {
    'filename': 'id/222',
    'description': 'Rosette Bengal Kitten 3 - Image 2',
    'contenttype': 'jpg',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 5,
    '_user_id': 4
  },
]

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ResourceSeeder {
  async run () {
    console.log('6 --> RESOURCE SEEDER')

    for(const [i, resource] of MOCK.entries()) {
      const $resource = await Factory
        .model('App/Models/Resource')
        .create(resource)

      const $entry = await use('App/Models/Entry').findOrFail(resource._entry_id)
      // console.log(i, ' >> ', $entry)
      // await $resource.entry().associate($entry) //belongsTo

      await $entry.resources().save($resource) //hasMany
    }
  }
}

module.exports = ResourceSeeder
