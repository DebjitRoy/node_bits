const {keplerData} = require('../models/planets.model')

const getPlanets = (req,res)=>{
    res.status(200).json(keplerData)
}

const getPlanetById = (req,res)=>{
    const {id} = req.params;
    console.log("planet id", id);
    const planetDetails = keplerData.filter(planet => planet.kepid === id)
    if(!planetDetails.length) {
        return res.status(400).json({error: "not found!"})
    }
    res.status(200).json(planetDetails[0])
}

module.exports = {
    getPlanets,
    getPlanetById
}