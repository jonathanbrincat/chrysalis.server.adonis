'use strict'

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

Route.on('/').render('home')

Route.get('/posts', 'PostController.index')
Route.get('/posts/add', 'PostController.add')
Route.get('/posts/edit/:uid', 'PostController.edit')
Route.get('/posts/:uid', 'PostController.details')
Route.post('/posts', 'PostController.store')
Route.put('/posts/:uid', 'PostController.update')
Route.delete('/posts/:uid', 'PostController.destroy')

// Route.on('jobs/').render('jobs/index')
Route.get('jobs/', 'JobController.index')
Route.get('/post-a-job', 'JobController.userIndex')

// Route.post('/post-a-job', 'JobController.create').validator('CreateJob');
// Route.post('/post-a-job/update/:id', 'JobController.update').validator('CreateJob');
// Route.get('/post-a-job/edit/:id', 'JobController.edit')
// Route.get('/post-a-job/delete/:id', 'JobController.delete')

Route.post('/post-a-job', 'JobController.create').validator('CreateJob');
Route.group( () => {
  Route.post('update/:id', 'JobController.update').validator('CreateJob');
  Route.get('edit/:id', 'JobController.edit')
  Route.get('delete/:id', 'JobController.delete')
}).prefix('/post-a-job/').auth() // DEVNOTE: you can chain and add middleware. in this instance calling auth will restrict access to these routes

// Route.on('/signup', 'AuthController.signup')
// Route.on('/login', 'AuthController.login')
Route.on('/signup').render('auth.signup')
Route.post('/signup', 'UserController.create').validator('CreateUser')
Route.on('/login').render('auth.login')
Route.post('/login', 'UserController.login').validator('LoginUser')
Route.get('/logout', async({ request, response, auth }) => {
  await auth.logout()
  return response.redirect('/')
})

Route.get('/test', () => 'Hello World')
Route.get('/test/:uid', ({params}) => `This is id ${params.uid}`)
