const express = require("express");
const usersLogic = require("../logic/users-logic");
const jwt = require('jsonwebtoken');
const config = require("../config.json")
const mapUser = require("../middleware/map")
const router = express.Router();
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");




router.get("/allUsers", async (request,response) => {
    let token = request.headers.authorization;
    let id = mapUser.checkMapForUserId(token);
    try {
        const users = await usersLogic.getAllUsers();
        console.log(users);
        response.json(users);
    }catch (error){
        console.log(error);
       response.send("Error Could not GET users")
    }
})

router.get("/forAdmin", async (request,response,next) => {
    let token = request.headers.authorization;
    let id = mapUser.checkMapForUserId(token);
    try {
        const user = await usersLogic.getUser(id);
        console.log(user);
        response.json(user);
    }catch (error){
        console.log(error);
        return next(error);
    }
})

router.get("/forClient", async (request,response,next) => {
    let token = request.headers.authorization;
    let id = mapUser.checkMapForUserId(token);
    try {
        const user = await usersLogic.getUserForClient(id);
        console.log(user);
        response.json(user);
    }catch (error){
        console.log(error);
        return next(error);
    }
})


router.get("/", async (request,response,next) => {
    let token = request.headers.authorization;
    let id = mapUser.checkMapForUserId(token);
    try {
        const user = await usersLogic.getUser(id);
        console.log(user);
        response.json(user);
    }catch (error){
        console.log(error);
        return next(error);
    }
})

router.post("/register", async (request,response,next) => {
    const userToAdd = request.body;
    try {
        const addedUser = await usersLogic.addUser(userToAdd);
        console.log(addedUser);
        response.json("User Was Added"+addedUser);
    }catch (error){
        console.log(error);
        return next(error);
    }
   
})

router.put("/", async(request,response,next) => {
    try {
        const userDetails = request.body
        const updatedUser = await usersLogic.updateUser(userDetails);
        response.json("User Was Updated"+updatedUser);
    } catch (error) {
        console.log(error);
        return next(error);
    }
})

router.delete("/:id", async (request,response,next) => {
    const id = +request.params.id
    try {
        const deletedUser = await usersLogic.deleteUser(id);
        console.log(deletedUser);
        response.json("User Was Deleted");
    }catch (error){
        console.log(error);
        return next(error);

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
        let loginResponse = {
            userType: usersLoginResult.Role,
            userID: usersLoginResult.UserID,
            userName: usersLoginResult.FirstName,
            token: token,
        };
        console.log(loginResponse)
        response.json(loginResponse);
        mapUser.saveUserInfo(token, usersLoginResult);
    }catch (error){
        console.log(error);
        return next(error);
    }
    
});

router.post("/changePassword",  async (request,response,next) => {
    const updateRequest = request.body;
    console.log("We got to the contro change password Level");
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