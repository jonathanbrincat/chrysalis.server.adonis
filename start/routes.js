'use strict'

const Database = use('Database')
const PostModel = use('App/Models/Post')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/register').render('auth.register')
Route.post('/register', 'UserController.create').validator('CreateUser')
Route.on('/login').render('auth.login')
Route.post('/login', 'UserController.login').validator('LoginUser')
Route.get('/logout', 'UserController.logout')

Route.get('/', 'PostController.getPosts').as('blog.index')
Route.get('/post/:id', 'PostController.getPost').as('blog.post')
Route.get('/post/:id/like', 'PostController.setLike').as('blog.post.like')

Route.post('/search', async ({request, response, view}) => {
  const q = request.input('q')
  console.log('search endpoint hit :: ', q && q.length);

  if(q && q.length > 0) {
    console.log('search endpoint hit :: ', q);

    const posts = await PostModel.query().where('title', 'LIKE', '%'+q+'%').fetch() //lucid ORM / knex.js
    // const posts = await PostModel.query().whereRaw('title like %?%', [q]).fetch() //lucid ORM / knex.js
    // const posts = await Database.select('*').from('posts').where('title', 'LIKE', '%'+q+'%') //raw + sql
    console.log(posts.toJSON());

    return view.render('blog.search', {
      posts: posts.toJSON()
    })

    // return response.status(200).json({
    //   posts: posts
    // })
  }

  return view.render('blog.search', {
    posts: []
  })

}).as('search')

Route.group( () => {
  Route.get('', 'PostController.getAdminIndex').as('admin.index')
  Route.get('create', 'PostController.getAdminCreate').as('admin.create')
  Route.post('create', 'PostController.postAdminCreate').as('admin.create')
  Route.get('delete/:id', 'PostController.getAdminDelete').as('admin.delete')
  Route.get('edit/:id', 'PostController.getAdminEdit').as('admin.edit')
  Route.post('edit/:id', 'PostController.postAdminUpdate').as('admin.update')
}).prefix('/admin/')

/*
Route.on('/').render('index')
// Route.get('/', 'PerkController.index')
// Route.get('/perks/like', 'PerkController.getLikePost')


Route.on('/perks/favourites').render('perks.favourites')
Route.on('/perks/activated').render('perks.activated')

Route.get('/perks', 'PerkController.index')
Route.get('/perks/create', 'PerkController.create')
Route.post('/perks', 'PerkController.createSave')
Route.get('/perks/edit/:uid', 'PerkController.edit')
Route.put('/perks/:uid', 'PerkController.editSave')
Route.delete('/perks/:uid', 'PerkController.delete')
Route.get('/perks/:uid', 'PerkController.details') //DEVNOTE: keep bottom of route deinitions otherwise router will intercept and assign wrong controller
*/

Route.get('/jobs', 'JobController.index')
Route.get('/jobs/create', 'JobController.userIndex')
Route.post('/jobs/create', 'JobController.create').validator('CreateJob')
Route.get('/jobs/edit/:id', 'JobController.edit')
Route.post('/jobs/save/:id', 'JobController.createSave').validator('CreateJob')
Route.get('/jobs/delete/:id', 'JobController.delete')


// Route.post('/jobs/create', 'JobController.create').validator('CreateJob')
// Route.group( () => {
//   Route.get('edit/:id', 'JobController.edit')
//   Route.post('save/:id', 'JobController.createSave').validator('CreateJob')
//   Route.get('delete/:id', 'JobController.delete')
// }).prefix('/jobs/')
// }).prefix('/jobs/').auth() // DEVNOTE: you can chain and add middleware. in this instance calling auth will restrict access to these routes

// Route.get('/test/:uid', ({params}) => `This is id ${params.uid}`)

Route.get('/profile', 'ProfileController.index')

// Must be logged in
// Route.group( () => {
// }).middleware(["auth"]);
