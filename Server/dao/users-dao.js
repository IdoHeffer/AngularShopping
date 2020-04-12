let connection = require("./connection");

async function getUser(id) {
    var sql = ("SELECT * FROM users WHERE UserID =?");
    let parameters = [id] 
    let userById = await connection.executeWithParameters(sql,parameters);
    console.log("User Returned FROM DB :"+userById);
    return userById;
}

async function addUser(user) {
    var sql = ("INSERT INTO marketproject.users (FirstName,LastName,UserName,password,Role,City,Street) VALUES (?,?,?,?,'CUSTOMER',?,?)");
    let parameters = [user.FirstName,user.LastName,user.UserName, user.password,user.City,user.Street]
    let addedUser = await connection.executeWithParameters(sql,parameters);
    console.log("User Created in the DB :"+addedUser)
    return addedUser;
}

async function updateUser(user) {
    var sql = ("UPDATE users SET FirstName=? ,LastName=?,UserName=?,City=?,Street=? WHERE UserID = ?");
    let parameters = [user.FirstName,user.LastName,user.UserName,user.City,user.Street,user.UserID]
    let updatedUser = await connection.executeWithParameters(sql,parameters);
    console.log("User Created in the DB :"+updatedUser)
    return updatedUser;
}

async function deleteUser(id) {
    var sql = ("DELETE FROM users WHERE UserID =?");
    let parameters = [id] 
    let deleteduser = await connection.executeWithParameters(sql,parameters);
    console.log("User Returned FROM DB :"+deleteduser);
}
async function login(user) {
    var sql = "SELECT * FROM users WHERE UserName =? and password = ?";
    let parameters = [user.userName, user.password];
    let usersLoginResult = await connection.executeWithParameters(sql,parameters);
    if (usersLoginResult.length == 0) {
        throw new Error("Unauthorized");
    }
    // console.log(usersLoginResult);
    // console.log("We got to the dao Level");
    // console.log("All good ! ");
    return usersLoginResult[0]
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
    console.log(users);
    return users
}

// let user = {UserName: "omB@gmail.com", FirstName:"Omer",password:"18199", LastName:"Ba", City:"Omer",Street:"Hahursha",UserID: "7"}
// addUser(user)


// deleteUser(7)

// let user = {UserName: "omB@gmail.com", FirstName:"Omer",LastName:"Ba", City:"Omer",Street:"Hahursha",UserID: "7"}
// updateUser(user)
// getUser(5)
// getAllUser()
// changePassword({userName: "IdoH@gmail.com", password:"123456"})
// let user = {userName: "IdoH@gmail.com", password: "123456"}
// login(user);

module.exports = {

    getUser,
    addUser,
    updateUser,
    deleteUser,
    login,
    getAllUsers,
    changePassword
}