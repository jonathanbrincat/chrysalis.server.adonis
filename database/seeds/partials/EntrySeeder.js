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
    "title": "Kitten 1",
    "body": "Lorem ipsum dolor, sit amet, consectetur adipisicing elit. Iusto, sapiente fuga nemo repellendus doloremque, aspernatur maxime tempora recusandae tempore delectus rem ipsa esse, est, omnis natus dolorem nisi odio totam.",
    "name": "['British Shorthair']",
    "sex": "m",
    "age": 21, //in days
    "colour": "Silver",
    "type": "Solid",
    "is_registered": false,
    "is_available": true,
    "_post_id": 1
  },
  {
    "title": "Kitten 2",
    "body": "Lorem, ipsum, dolor sit amet consectetur adipisicing elit. Esse recusandae perspiciatis, quos eveniet similique, ipsa autem atque ullam cupiditate dicta. Porro alias aliquam explicabo quae, cum quisquam repudiandae ut itaque.",
    "name": "['British Shorthair']",
    "sex": "f",
    "age": 21,
    "colour": "Silver",
    "type": "Solid",
    "is_registered": false,
    "is_available": true,
    "_post_id": 1
  },
  {
    "title": "Kitten 1",
    "body": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit sed nam iusto optio, alias fuga consectetur minus suscipit molestias quis distinctio cumque eligendi nostrum vel, rerum, aliquid dolorum, iure obcaecati.",
    "name": "['Bengal']",
    "sex": "f",
    "age": 3,
    "colour": "",
    "type": "Marble",
    "is_registered": true,
    "is_available": true,
    "_post_id": 2
  },
  {
    "title": "Kitten 2",
    "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et nesciunt molestias, non aliquam in iste id nostrum voluptatibus dolore debitis delectus corrupti accusantium dolorum nulla deleniti ea facere consequatur saepe.",
    "name": "['Bengal']",
    "sex": "f",
    "age": 3,
    "colour": "",
    "type": "Rosette",
    "is_registered": true,
    "is_available": true,
    "_post_id": 2
  },
  {
    "title": "Kitten 3",
    "body": "Lorem ipsum dolor sit, amet, consectetur adipisicing elit. Non iure rem corrupti aut, consequatur quisquam facilis commodi temporibus est esse enim cum aliquid ullam accusamus odio perspiciatis eveniet sint! Tenetur.",
    "name": "['Bengal']",
    "sex": "m",
    "age": 3,
    "colour": "",
    "type": "Spotted",
    "is_registered": true,
    "is_available": false,
    "_post_id": 2
  },
  {
    "title": "Kitten 1",
    "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam maxime nemo voluptas vel illo, labore, cupiditate explicabo laudantium impedit laborum ipsa, eligendi? Suscipit, aspernatur! Provident nostrum consequatur similique. Veritatis, illo.",
    "name": "['Mixed']",
    "sex": "m",
    "age": 10,
    "colour": "",
    "type": "Tabby",
    "is_registered": false,
    "is_available": true,
    "_post_id": 3
  },
  {
    "title": "Puppy 1",
    "body": "Lorem ipsum, dolor sit amet consectetur adipisicing, elit. Non magni voluptatem, ullam facilis dolorem sequi labore sint voluptatibus perferendis et corrupti quibusdam error. Porro omnis voluptatibus, corrupti velit sunt cum.",
    "name": "['French Bulldog']",
    "sex": "f",
    "age": 3,
    "colour": "",
    "type": "solid",
    "is_registered": false,
    "is_available": true,
    "_post_id": 4
  },
  {
    "title": "Dog 1",
    "body": "Lorem, ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos, esse debitis, itaque, numquam velit, porro harum sunt magnam mollitia quam iusto aliquid at officia dolorem vero amet ad voluptatum eligendi.",
    "name": "",
    "sex": "m",
    "age": 3,
    "colour": "",
    "type": "",
    "is_registered": false,
    "is_available": true,
    "_post_id": 5
  },
  {
    "title": "Rabbit 1",
    "body": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit aspernatur voluptatibus nostrum minus voluptate unde, quisquam error modi itaque sapiente eligendi magnam incidunt corporis consequuntur debitis, illo dolorem cum dolor.",
    "name": "f",
    "sex": "",
    "age": 3,
    "colour": "",
    "type": "",
    "is_registered": false,
    "is_available": true,
    "_post_id": 6
  },
  {
    "title": "Rabbit 1",
    "body": "Lorem ipsum dolor sit, amet, consectetur adipisicing elit. Minus odit, quibusdam facilis, et illum repellat accusantium obcaecati commodi qui, laborum quam, alias voluptatum distinctio sunt laboriosam voluptatibus a dolorum dolore.",
    "name": "['Netherland Dwarf']",
    "sex": "m",
    "age": 3,
    "colour": "",
    "type": "",
    "is_registered": false,
    "is_available": true,
    "_post_id": 7
  },
  {
    "title": "Puppy 1",
    "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique repellat voluptate ut ab. Ea, incidunt nemo recusandae nostrum, accusantium libero, commodi quas quia repellat aspernatur laboriosam, architecto quasi sapiente reiciendis.",
    "name": "['Labrador Retriever']",
    "sex": "f",
    "age": 3,
    "colour": "brown",
    "type": "solid",
    "is_registered": false,
    "is_available": true,
    "_post_id": 8
  },
  {
    "title": "Cat 1",
    "body": "Lorem ipsum dolor, sit, amet consectetur adipisicing elit. Maiores quod delectus est eos modi cupiditate ipsa sapiente quae, officia laboriosam. Quos vitae corporis iure repudiandae consectetur beatae unde a sint.",
    "name": "['Bengal', 'Maine Coon']",
    "sex": "m",
    "age": 3,
    "colour": "",
    "type": "",
    "is_registered": false,
    "is_available": true,
    "_post_id": 10
  },
]

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class EntrySeeder {
  static async run () {
    console.log('5 --> ENTRY SEEDER')

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
