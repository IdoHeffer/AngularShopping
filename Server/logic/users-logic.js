const usersDao = require("../dao/users-dao");
const validation = require("../validation/validation")
const User = require("../models/user")
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
const crypto = require("crypto");


const saltRight = "dsayuieqwczxf";
const saltLeft = "+-sdvcx@fd#g!$";

async function getAllUsers() {
    let users = await usersDao.getAllUsers();
    validation.validateResponse(users)
    console.log(users);
    return users;
}
async function getUser(id) {
    validation.validateId(id);
    let user = await usersDao.getUser(id);
    validation.validateResponse(user)
    return user;
}

async function getUserForClient(id) {
    validation.validateId(id);
    let user = await usersDao.getUser(id);
    return user;
}

async function addUser(user) {
    validateUser(user);
    console.log("User Is valid");
    user.password = crypto.createHash("md5").update(saltLeft + user.password + saltRight).digest("hex");
    console.log("Hashed password : " + user.password);
    let addedUser = await  usersDao.addUser(user)
    return addedUser;
}

async function updateUser(userDetails) {
    validateUser(userDetails)
    await usersDao.updateUser(userDetails)
    return 1
}

async function deleteUser(id) {
    validation.validateId(id);
    usersDao.deleteUser(id)
}

async function login(userData){
    // console.log(userData)
    userData.password = crypto.createHash("md5").update(saltLeft + userData.password + saltRight).digest("hex");
    console.log("Hashed password : " + userData.password);
    let usersLoginResult = await usersDao.login(userData)
    validation.validateResponse(usersLoginResult)
    // console.log("We got to the logic Level");
    return usersLoginResult;
};

async function changePassword(userData) {
    userData.password = crypto.createHash("md5").update(saltLeft + userData.password + saltRight).digest("hex");
    console.log("Hashed password : " + userData.password);

    await usersDao.changePassword(userData)
    console.log("We got to the logic Level");
    return ;
}

function validateUser(user) {
    // Validate the user object:
    const errorDetails = User.validate(user);
    if (errorDetails) {
        throw new Error("invalid user"+errorDetails)
    }

}


// let user = {UserName: "Liel555@gmail.com",password:"LielB123456", FirstName:"Liel",LastName:"Ben-Ami", City:"Petah-Tikva",Street:"Threza"}
// let user ={UserName:"IdoH@gmail.com",password:"Ido15011997",FirstName:"Ido",LastName:"Heffer",City:" ",Street:" "};

// function tetsHash(user) {
//     user.password = crypto.createHash("md5").update(saltLeft + user.password + saltRight).digest("hex");
//     console.log("Hashed password : " + user.password);
// }
// tetsHash(user)




// login(userData);
// getAllUsers();
// getUser(5);
// validateUser(user);
// addUser(user);

module.exports = {
    getUser,
    addUser,
    updateUser,
    deleteUser,
    login,
    changePassword,
    getAllUsers,
    getUserForClient
}