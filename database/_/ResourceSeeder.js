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
    'filename': 'image_1.jpg',
    'description': '',
    'contenttype': 'jpg',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 1,
    '_user_id': 1
  },
  {
    'filename': 'image_1.jpg',
    'description': '',
    'contenttype': 'jpg',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 1,
    '_user_id': 1
  },
  {
    'filename': 'image_1.png',
    'description': '',
    'contenttype': 'png',
    'dimensions': '',
    'filesize': '',
    '_entry_id': 2,
    '_user_id': 1
  },
]

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ResourceSeeder {
  async run () {
    console.log('6 --> RESOURCE SEEDER')

    for(const [i, resource] of MOCK.entries()) {
      console.log(i, ' :: ', resource)

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
