'use strict'

/*
|--------------------------------------------------------------------------
| MainSeeder
|--------------------------------------------------------------------------
| https://github.com/raphaelramalho/adonisjs-database-seedera
| Taken as inspiration I have modified to suit my preferences and dropped the arbitary command that would need to be remember in favour of retaining adonis migration:run --seed command
| seeding appears to scrap all files and folders in seeds directory including the folder itself which will cause the message 'Object does not have a run method' to appear in terminal
*/
const UserSeeder = require('./partials/UserSeeder')
const ProfileSeeder = require('./partials/ProfileSeeder')
const TagSeeder = require('./partials/TagSeeder')
const PostSeeder = require('./partials/PostSeeder')
const EntrySeeder = require('./partials/EntrySeeder')
const ResourceSeeder = require('./partials/ResourceSeeder')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

// DEVNOTE: when you run adonis migration:run --seed
// the order of the seeding is not definable. I thought seed files would be executed in respects to their migrations but they are not. I think the sequence is in alphabetical order(console.logs confirm this suspicion)
// this means something like the UserSeeder gets called at the end rather than the beginning.
// when relationships are asserted this is a problem as the data hasn't been seeded it doesn't exist
// the workaround is to use individual commands when seeding i.e. adonis seed --files=UserSeeder.js

class MainSeeder {
  async run () {
    console.log('MAIN SEEDER')

    // Declare seeders in sequential order. Note: run() exposed as Class method via static type
    await UserSeeder.run()
    await ProfileSeeder.run()
    await TagSeeder.run()
    await PostSeeder.run()
    await EntrySeeder.run()
    await ResourceSeeder.run()
  }
}

module.exports = MainSeeder
