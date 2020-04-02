const express = require('express');
const route = express.Router();

const teacherControl = require('./controllers/TeacherController');
const managerControl = require('./controllers/ManagerController');
const profileControl = require('./controllers/profileController');
const sessionControl = require('./controllers/SessionController')

route.post('/session', sessionControl.create)

route.get('/teachers', teacherControl.index);
route.post('/teacher', teacherControl.create);
// route.put('/teacher/:id', teacherControl.update)
route.delete('/teacher/:id', teacherControl.remove);

route.get('/profile', profileControl.index)

route.post('/manager', managerControl.create);
route.get('/managers', managerControl.index);
// route.put('/manager/:id', managerControl.update)
// route.delete('/manager/:id', managerControl.remove);


//para testes
route.post('/teste', function(req, res){
	console.log(req.headers);

	res.json(req.headers.authorization);
})


module.exports = route;