const express = require('express')
const app = express()

const route = express.Router()
// loading routers
const userRouter = require('./user-router')
const teacherRouter = require('./teacher-router')

// loading models
const User = require('../models/User')
const Teacher = require('../models/Teacher')


route.get('/', (req, res, next) => {
	console.log("Nas routas gerais")
	res.status(200).send({
		title: 'Node API',
		version: '0.0.1'
	})
})


route.use('/user', userRouter)

route.use('/teacher', teacherRouter)


module.exports = route
