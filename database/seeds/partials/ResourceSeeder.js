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
    'filename': 'kitten-1_image-1.jpg',
    'description': 'British Shorthair Kitten 1',
    'contenttype': 'jpg',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 1,
    '_user_id': 2 //DEVNOTE: PostSeeder assigns this with random number generator
  },
  {
    'filename': 'kitten-1_image-2.jpg',
    'description': 'British Shorthair Kitten 1',
    'contenttype': 'jpg',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 1,
    '_user_id': 2
  },
  {
    'filename': 'kitten-1_image-3.jpg',
    'description': 'British Shorthair Kitten 1',
    'contenttype': 'jpg',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 1,
    '_user_id': 2
  },
  {
    'filename': 'kitten-1_image-4.jpg',
    'description': 'British Shorthair Kitten 1',
    'contenttype': 'jpg',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 1,
    '_user_id': 2
  },
  {
    'filename': 'kitten-1_image-5.jpg',
    'description': 'British Shorthair Kitten 1',
    'contenttype': 'jpg',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 1,
    '_user_id': 2
  },
  {
    'filename': 'kitten-2_image-1.png',
    'description': 'British Shorthair  Kitten 2',
    'contenttype': 'png',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 2,
    '_user_id': 2
  },
  {
    'filename': 'kitten-2_image-2.png',
    'description': 'British Shorthair  Kitten 2',
    'contenttype': 'png',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 2,
    '_user_id': 2
  },
  {
    'filename': 'kitten-2_image-3.png',
    'description': 'British Shorthair  Kitten 2',
    'contenttype': 'png',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 2,
    '_user_id': 2
  },
  {
    'filename': 'kitten-1_image-1.jpeg',
    'description': 'Marble Bengal Kitten 1',
    'contenttype': 'jpg',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 3,
    '_user_id': 4
  },
  {
    'filename': 'kitten-1_image-2.jpeg',
    'description': 'Marble Bengal Kitten 1',
    'contenttype': 'jpg',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 3,
    '_user_id': 4
  },
  {
    'filename': 'kitten-2_image-1.jpeg',
    'description': 'Spotted Bengal Kitten 2',
    'contenttype': 'jpg',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 4,
    '_user_id': 4
  },
  {
    'filename': 'kitten-3_image-1.jpeg',
    'description': 'Rosette Bengal Kitten 3',
    'contenttype': 'jpg',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 5,
    '_user_id': 4
  },
  {
    'filename': 'kitten-3_image-2.jpeg',
    'description': 'Rosette Bengal Kitten 3',
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
  static async run () {
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
