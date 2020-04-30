let connection = require("./connection");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

async function getUser(id) {
    var sql = ("SELECT * FROM users WHERE UserID =?");
    let parameters = [id] 
    let userById = await connection.executeWithParameters(sql,parameters);
    return userById;
}

async function getUserForClient(id) {
    var sql = ("SELECT FirstName, LastName, UserName, City, Street  FROM users WHERE UserID =?");
    let parameters = [id] 
    let userById = await connection.executeWithParameters(sql,parameters);
    return userById;
}

async function addUser(user) {
    try{
        var sql = ("INSERT INTO marketproject.users (FirstName,LastName,UserName,password,Role,City,Street) VALUES (?,?,?,?,'CUSTOMER',?,?)");
        let parameters = [user.FirstName,user.LastName,user.UserName, user.password,user.City,user.Street]
        let addedUser = await connection.executeWithParameters(sql,parameters);
        return addedUser;
    }catch(e){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
    
}

async function updateUser(user) {
    var sql = ("UPDATE users SET FirstName=? ,LastName=?,UserName=?,City=?,Street=? WHERE UserID = ?");
    let parameters = [user.FirstName,user.LastName,user.UserName,user.City,user.Street,user.UserID]
    let updatedUser = await connection.executeWithParameters(sql,parameters);
    return updatedUser;
}

async function deleteUser(id) {
    var sql = ("DELETE FROM users WHERE UserID =?");
    let parameters = [id] 
    let deleteduser = await connection.executeWithParameters(sql,parameters);
}
async function login(user) {
    try{
        var sql = "SELECT * FROM users WHERE UserName =? and password = ?";
        let parameters = [user.userName, user.password];
        let usersLoginResult = await connection.executeWithParameters(sql,parameters);
        if (usersLoginResult.length == 0) {
            throw new ServerError(ErrorType.UNAUTHORIZED);
        }
        return usersLoginResult[0];
    }catch(e){
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }
}
    
async function changePassword(userData) {
    var sql = "UPDATE users set password = ? where UserName = ?";
    let parameters = [ userData.password,userData.userName];
    await connection.executeWithParameters(sql,parameters);
    console.log("We got to the dao change password Level");
    console.log("All good ! ");
}

async function getAllUsers() {
    var sql = ("SELECT * FROM users"); 
    let users = await connection.execute(sql);
    return users
}

module.exports = {

    getUser,
    addUser,
    updateUser,
    deleteUser,
    login,
    getAllUsers,
    changePassword,
    getUserForClient
}