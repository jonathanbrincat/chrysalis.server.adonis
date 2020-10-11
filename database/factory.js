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

Factory.blueprint('App/Models/User', async (faker, i, data) => {
  return {
    // username: data[i].username, //DENOTE: should be on profile model
    username: faker.username(),
    // email: data[i].email,
    email: faker.email(),
    password: '12345'
    // password: await Hash.make(faker.password())
  }
})

Factory.blueprint('App/Models/Post', async (faker, i, data) => {
  return {
    // title: faker.sentence({ words: faker.natural({ min: 2, max: 6 }) }),
    title: data.title,
    // title: data[i].title,
    // body: faker.paragraph(),
    body: data.body,
    // user_id: faker.natural({ min: 1, max: 5 })
  }
})

Factory.blueprint('App/Models/Tag', (faker, i, data) => {
  return {
    name: data[i].name
  }
})

Factory.blueprint('App/Models/Entry', (faker, i, data) => {
  // console.log('factory >> ', data)

  return {
    title: data.title,
    body: data.body,
    name: data.name,
    sex: data.sex,
    age: data.age,
    colour: data.colour,
    type: data.type,
    is_registered: data.is_registered,
    is_available: data.is_available,
  }
})

Factory.blueprint('App/Models/Profile', (faker) => {
  return {
    username: faker.username(),
    firstname: 'Joe',
    lastname: 'Bloggs',
    address: '',
    postcode: '1ABAB1',
    country: 'GB',
    avatar: ''
  }
})

//faker.randomElement(["house", "flat", "apartment", "room", "shop", "lot", "garage"])
