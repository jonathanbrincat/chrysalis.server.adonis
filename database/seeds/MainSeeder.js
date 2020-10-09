'use strict'

/*
|--------------------------------------------------------------------------
| MainSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
| https://github.com/raphaelramalho/adonisjs-database-seedera
| Taken as inspiration I have modified to suit my preferences and dropped the arbitary command that would need to be remember in favour of retaining adonis migration:run --seed command
| seeding appears to scrap all files and folders in seeds directory including the folder itself which will cause the message 'Object does not have a run method' to appear in terminal
|
*/

const UserSeeder = require('./partials/UserSeeder')
const TagSeeder = require('./partials/TagSeeder')
const PostSeeder = require('./partials/PostSeeder')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class MainSeeder {
  async run () {
    console.log('MAIN SEEDER')

    // Declare seeders in sequential order. Note: run() exposed as Class method via static type
    await UserSeeder.run()
    await TagSeeder.run()
    await PostSeeder.run()
  }
}

module.exports = MainSeeder
