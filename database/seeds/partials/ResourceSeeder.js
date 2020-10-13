'use strict'

/*
|--------------------------------------------------------------------------
| ResourceSeeder
|--------------------------------------------------------------------------
*/
const MOCK = require('../mocks/resourceMock')

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
