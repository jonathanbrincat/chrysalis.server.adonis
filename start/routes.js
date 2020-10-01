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

Route.get('/posts/:id/like', 'LikeController.setLike').as('posts.like')

Route.get('/posts/:id/saved', 'SavedController.index').as('saved.index')
Route.post('/posts/:id/saved', 'SavedController.store').as('saved.store')
Route.delete('/posts/:id/saved', 'SavedController.destroy').as('saved.destroy')

/*
* Post
**/
Route.resource('posts', 'PostController')

/*Route.group(() => {
  Route.get('', 'PostController.index').as('posts.index')

  Route.get('create', 'PostController.create').as('posts.create')
    Route.post('', 'PostController.store').as('posts.store')

  Route.get(':id/edit', 'PostController.edit').as('posts.edit')
    Route.put(':id', 'PostController.update').as('posts.update')

  Route.delete(':id', 'PostController.destroy').as('posts.destroy')

  Route.get(':id', 'PostController.show').as('posts.show')
}).prefix('/posts/')*/


/*
* Tags
**/
Route.get('/tags/:id', 'TagController.index').as('tags.index')

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

/*
* Chat
**/
Route.group(() => {
  Route.get('', 'ChatController.index').as('chat.index')
}).prefix('/chat/').middleware(["auth"])
