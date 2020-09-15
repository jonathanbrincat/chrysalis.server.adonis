'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')

// Factory.blueprint('App/Models/User', (faker) => {
//   return {
//     username: faker.username()
//   }
// })

// User blueprint
Factory.blueprint('App/Models/User', async (faker) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: await Hash.make(faker.password())
  }
})

// Post blueprint
Factory.blueprint('App/Models/Post', (faker) => {
  return {
    title: faker.sentence({ words: faker.natural({ min: 2, max: 6 }) }),
    content: faker.paragraph(),
    user_id: faker.natural({ min: 1, max: 10 })
  }
})
