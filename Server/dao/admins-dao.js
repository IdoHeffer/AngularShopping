let connection = require("./connection")

async function getUser(id) {
    var sql = ("SELECT * FROM users WHERE id =?");
    let parameters = [id] 
    let userById = await connection.executeWithParameters(sql,parameters);
    console.log("User Returned FROM DB :"+userById)
    return userById;
}

function addUser(user) {
    return null;
}

function updateUser(id) {
    return null;
}
function deleteUser(id) {
    return null;
}

async function getAllUser() {
    var sql = ("SELECT * FROM users"); 
    let users = await connection.execute(sql);
    console.log(users);
    return users
}
// Login({userName: "IdoH", password:"1234"})

module.exports = {

    getUser,
    addUser,
    updateUser,
    deleteUser,
    getAllUser
}