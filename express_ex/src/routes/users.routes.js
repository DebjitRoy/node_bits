const express = require('express');

const {getUsers,getUserById,getUserImageById, addUser} = require('../controllers/users.controllers')
const usersRouter = express.Router();

usersRouter.get('/',getUsers);
usersRouter.get('/:id',getUserById);
usersRouter.get('/image/:id',getUserImageById);
usersRouter.post('/',addUser);

module.exports = usersRouter