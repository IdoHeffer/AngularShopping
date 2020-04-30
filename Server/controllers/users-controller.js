const express = require("express");
const usersLogic = require("../logic/users-logic");
const jwt = require('jsonwebtoken');
const config = require("../config.json")
const mapUser = require("../middleware/map")
const router = express.Router();

router.get("/forAdmin", async (request,response) => {
    let token = request.headers.authorization;
    let id = mapUser.checkMapForUserId(token);
    try {
        const user = await usersLogic.getUser(id);
        console.log(user);
        response.json(user);
    }catch (error){
        console.log(error);
        response.status(404).send("Error,No existing User" +error);
    }
})

router.get("/forClient", async (request,response) => {
    let token = request.headers.authorization;
    let id = mapUser.checkMapForUserId(token);
    try {
        const user = await usersLogic.getUserForClient(id);
        console.log(user);
        response.json(user);
    }catch (error){
        console.log(error);
        response.status(404).send("Error,No existing User" +error);
    }
})

router.post("/register", async (request,response) => {
    const userToAdd = request.body;
    try {
        const addedUser = await usersLogic.addUser(userToAdd);
        console.log(addedUser);
        response.json("User Was Added"+addedUser);
    }catch (error){
        console.log(error);
        response.status(404).send("Error,Cannot Add the User" +error);
    }
   
})

router.put("/:id",(request,response) => {
    const id = +request.params.id
    usersLogic.updateUser(id);
    
})

router.delete("/:id", async (request,response) => {
    const id = +request.params.id
    try {
        const deletedUser = await usersLogic.deleteUser(id);
        console.log(deletedUser);
        response.json("User Was Deleted");
    }catch (error){
        console.log(error);
        response.status(404).send("Error,Cannot Delete the User" +error);
    }
    
})

router.post("/login",  async (request,response, next) => {
    const user = request.body;
     // After a successful login, add the following header to each request
    // Authorization: The word Bearer, space (" ") and then - the token.
    // Example : 
    // Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBdmkiLCJpYXQiOjE1ODU0OTAxMjd9.O01aQaKcEOHgRexVwwX53T_SqMmKBxP3ng2dlriackA
    const token = jwt.sign({ sub: user }, config.secret);
    try {
        let usersLoginResult = await usersLogic.login(user);
        // console.log(usersLoginResult);
        let loginResponse = {
            userType: usersLoginResult.Role,
            userID: usersLoginResult.UserID,
            userName: usersLoginResult.UserName,
            token: token,
        };
        console.log(loginResponse)
        // console.log("Welcome Back Succesfull Login"+JSON.stringify(loginResponse.userType));
        // response.send({token:token, userType:usersLoginResult.Role, userID: usersLoginResult.UserID});
        response.json(loginResponse);
        mapUser.saveUserInfo(token, usersLoginResult);
    }catch (error){
        return next(error);
    }
    
});

router.post("/changePassword",  async (request,response,next) => {
    const updateRequest = request.body;
    try {
        await usersLogic.changePassword(updateRequest);
        console.log("We got to the dao change password Level");
        response.status(200).send();
    }catch (error){
        console.log(error);
        return next(error);
    }
    
});





module.exports = router 