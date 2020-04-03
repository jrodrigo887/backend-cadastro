const express = require('express')
const route = express.Router()

const teacherControl = require('./controllers/TeacherController')
const managerControl = require('./controllers/ManagerController')
const profileControl = require('./controllers/profileController')
const sessionControl = require('./controllers/SessionController')
const loginControl = require('./controllers/loginController')

route.post('/session', sessionControl.create)

route.get('/teachers', teacherControl.index)
route.post('/teacher', teacherControl.create)
// route.put('/teacher/:id', teacherControl.update)
route.delete('/teacher/:id', teacherControl.remove)

route.get('/profile', profileControl.index)

route.post('/manager', managerControl.create)
route.get('/managers', managerControl.index)
// route.put('/manager/:id', managerControl.update)
// route.delete('/manager/:id', managerControl.remove)

// para testes
route.post('/login', loginControl.sigin)

module.exports = route
