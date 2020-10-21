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
    // email: data[i].email,
    email: faker.email(),
    password: '12345'
    // password: await Hash.make(faker.password())
  }
})

Factory.blueprint('App/Models/Profile', (faker, i, data) => {
  return {
    avatar: data.avatar,
    username: data.username || faker.username(),
    firstname: data.firstname,
    lastname: data.lastname,
    //DEVNOTE: for data protection it might be wise to detach and segment personalised information so it is stored anonymised
    address_identity: data.address_identity,
    address_line_1: data.address_line_1,
    address_line_2: data.address_line_2,
    address_location: data.address_location,
    address_region: data.address_region,
    address_postcode: data.address_postcode,
    contact_primary_phone: data.contact_primary_phone,
    contact_primary_email: data.contact_primary_email,
    is_verified: data.is_verified,
    is_breeder: data.is_breeder
  }
})

Factory.blueprint('App/Models/Tag', (faker, i, data) => {
  return {
    name: data[i].name
  }
})

Factory.blueprint('App/Models/Post', (faker, i, data) => {
  return {
    // title: faker.sentence({ words: faker.natural({ min: 2, max: 6 }) }),
    title: data.title,
    // title: data[i].title,
    // body: faker.paragraph(),
    body: data.body,
    // user_id: faker.natural({ min: 1, max: 5 })
  }
})

Factory.blueprint('App/Models/Entry', (faker, i, data) => {
  return {
    title: data.title,
    body: data.body,
    name: data.name,
    sex: data.sex,
    age: data.age,
    colour: data.colour,
    type: data.type,
    is_registered: data.is_registered,
    is_available: data.is_available
  }
})

Factory.blueprint('App/Models/Resource', (faker, i, data) => {
  return {
    filename: data.filename,
    description: data.description,
    contenttype: data.contenttype,
    dimensions: data.dimensions,
    filesize: data.filesize
  }
})

//faker.randomElement(["house", "flat", "apartment", "room", "shop", "lot", "garage"])
