const userDao = require("../dao/admins-dao");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
const crypto = require("crypto");



const saltRight = "dsayuieqwczxf";
const saltLeft = "+-sdvcx@fd#g!$";

async function getUser(id) {
    let user = await userDao.getUser(id);
    return user;
}

async function addUser(user) {
    user.password = crypto.createHash("md5").update(saltLeft + user.password + saltRight).digest("hex");
    console.log("Hashed password : " + user.password);
    let addedUser = await  userDao.addUser(user)
    console.log("We got to the logic Level");
    return addedUser
}

function updateUser(id) {
    userDao.updateUser(id)
}

function deleteUser(id) {
    userDao.deleteUser(id)
}


module.exports = {
    getUser,
    addUser,
    updateUser,
    deleteUser,
}