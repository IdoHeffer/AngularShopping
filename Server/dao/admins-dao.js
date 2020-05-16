let connection = require("./connection")
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

async function getUser(id) {
    var sql = ("SELECT * FROM users WHERE id =?");
    let parameters = [id] 
    let userById = await connection.executeWithParameters(sql,parameters);
    console.log("User Returned FROM DB :"+userById)
    return userById;
}

async function addUser(user) {
    try{
        var sql = ("INSERT INTO marketproject.users (FirstName,LastName,UserName,password,Role,City,Street) VALUES (?,?,?,?,?,?,?)");
        let parameters = [user.FirstName,user.LastName,user.UserName, user.password,user.Role,user.City,user.Street]
        let addedUser = await connection.executeWithParameters(sql,parameters);
        return addedUser;
    }catch(e){
        console.log(e)
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
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