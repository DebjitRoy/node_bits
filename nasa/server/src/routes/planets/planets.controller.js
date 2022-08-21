const { getPlanets } = require("../../models/planets.model");

const getAllPlanets = (req, res) => res.status(200).json(getPlanets());

module.exports = { getAllPlanets };
