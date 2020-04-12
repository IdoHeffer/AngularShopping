const usersDao = require("../dao/users-dao");
const validation = require("../validation/validation")
const User = require("../models/user")


async function getAllUsers() {
    let users = await usersDao.getAllUsers();
    validation.validateResponse(users)
    return users;
}

async function getUser(id) {
    validation.validateId(id);
    let user = await usersDao.getUser(id);
    validation.validateResponse(user)
    return user;
}

async function addUser(user) {
    validateUser(user);
    console.log("User Is valid");
    let addedUser = await  usersDao.addUser(user)
    console.log("We got to the logic Level");
    return addedUser;
}

async function updateUser(id) {
    validateUser(user)
    usersDao.updateUser(id)
}

async function deleteUser(id) {
    validation.validateId(id);
    usersDao.deleteUser(id)
}
async function login(userData){
    // console.log(userData)
    let usersLoginResult = await usersDao.login(userData)
    validation.validateResponse(usersLoginResult)
    console.log(usersLoginResult)
    // console.log("We got to the logic Level");
    return usersLoginResult;
};
async function changePassword(userData) {
    await usersDao.changePassword(userData)
    console.log("We got to the logic Level");
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
    getAllUsers
}