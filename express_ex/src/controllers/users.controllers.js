const userModel = require('../models/users.model')
const path = require('path');

const getUsers = (req,res)=>{
    res.json(userModel)
}

const getUserById = (req,res)=>{
    const {id} = req.params;

    const isUserAvailable = userModel.some(user=>user.id === id);
    if(!isUserAvailable) {
        res.status(400).send("user not found")
    }
    const user = userModel.filter(user => user.id === id)[0]
    res.json(user)
}

const addUser = (req,res)=>{
    console.log("post body", req.body)
    if(!req.body || !req.body.data){
        return res.status(404).json({error:"user body required"})
    }
    res.json(req.body)
}

const getUserImageById = (req,res) =>{
    const imgPath = path.join(__dirname,'public','..','..','..','public', 'images','dooars.jpg');
    res.sendFile(imgPath)
}

module.exports = {
    addUser,
    getUsers,
    getUserById,
    getUserImageById
}