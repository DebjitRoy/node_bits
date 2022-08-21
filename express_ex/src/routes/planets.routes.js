const express = require('express');

const {getPlanets,getPlanetById} = require('../controllers/planets.controller')

const planetsRouter = express.Router();

planetsRouter.get('/',getPlanets);
planetsRouter.get('/:id',getPlanetById);

module.exports = planetsRouter;