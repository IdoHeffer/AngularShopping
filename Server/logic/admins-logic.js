const userDao = require("../dao/admins-dao");

async function getUser(id) {
    let user = await userDao.getUser(id);
    return user;
}

async function addUser(user) {
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