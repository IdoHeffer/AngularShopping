const express = require("express");
const usersLogic = require("../logic/admins-logic");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

const router = express.Router();

router.get("/:id", async (request,response,next) => {
    const id = +request.params.id;
    try {
        const user = await usersLogic.getUser(id);
        console.log(user);
        response.json(user);
    }catch (error){
        console.log(error);
        return next(error);
    }
})

router.post("/",  async (request,response,next) => {
    const userToAdd = request.body;
    try {
        const addedUser = await usersLogic.addUser(userToAdd);
        console.log(addedUser);
        response.json(addedUser);
    }catch (error){
        console.log(error);
        return next(error);
    }
   
})

router.put("/:id",(request,response) => {
    try {
        const id = +request.params.id
        usersLogic.updateUser(id);    
    } catch (error) {
        console.log(error);
        return next(error)
    }
})

router.delete("/:id",(request,response) => {
    const id = +request.params.id
    usersLogic.deleteUser(id);
   
    
})

module.exports = router 