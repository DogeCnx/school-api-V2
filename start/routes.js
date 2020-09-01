'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  
  //teaacher table
  Route.resource('/teachers','TeacherController'); //auto gen
  // Route.get('/teachers','TeacherController.index')
  // Route.get('/teachers/:id','TeacherController.show')
  // Route.post('/teachers' ,'TeacherController.store')
  // Route.put('/teachers/:id','TeacherController.update')
  // Route.patch('/teachers/:id','TeacherController.update')
  // Route.delete('/teachers/:id','TeacherController.destroy')
  
  //students table
  Route.resource('/students', 'StudentController');

  //subjects
  Route.resource('/subjects', 'SubjectController');

  //group
  Route.resource('/groups', 'GroupController');

  //enrollments
  Route.resource('/enrollments', 'EnrollmentController');

  

}).prefix('api/v1')