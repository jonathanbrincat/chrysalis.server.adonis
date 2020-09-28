'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

Route.group(() => {
  Route.on('/register').render('user.register')
    Route.post('/register', 'UserController.create').validator('CreateUser')

  Route.on('/login').render('user.login')
    Route.post('/login', 'UserController.login').validator('LoginUser')

  Route.get('/logout', 'UserController.logout')

  Route.get('/', 'PageController.index').as('page.index')
})

Route.post('/search', 'SearchController.index').as('pages.search')

Route.get('/post', 'PostController.getPosts').as('posts.index')

Route.get('/post/:id/like', 'PostController.setLike').as('post.like')
Route.get('/post/:id/favourite', 'PostController.getFavourite')

/*
* Post
**/
Route.group(() => {
  Route.get('create', 'PostController.getAdminCreate').as('post.create')
    Route.post('create', 'PostController.postAdminCreate').as('post.create')

  Route.get('update/:id', 'PostController.getAdminEdit').as('post.update')
    Route.post('update/:id', 'PostController.postAdminUpdate').as('post.update')
    // Route.put(':id', 'PostController.postAdminUpdate').as('post.update')

  Route.get('delete/:id', 'PostController.getAdminDelete').as('post.delete')
  // Route.delete(':id', 'PostController.getAdminDelete').as('post.delete')

  Route.get(':id', 'PostController.index').as('post.index')
}).prefix('/post/')

/*
* Dashboard
**/
Route.group(() => {
  Route.get('', 'DashboardController.index').as('dashboard.index')
}).prefix('/dashboard/').middleware(["auth"])  //.auth() // DEVNOTE: you can chain and add middleware. in this instance calling auth will restrict access to these routes

/*
* Profile
**/
Route.group(() => {
  Route.get('', 'ProfileController.index').as('profile.index')
}).prefix('/profile/').middleware(["auth"])


