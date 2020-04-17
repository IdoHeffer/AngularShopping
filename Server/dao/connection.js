var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root1997",
    database: "marketproject",

});
  

connection.connect(err =>{
    if (err) {
        console.log("Failed to connect to DB");
        console.log("Error:"+err);
        return;
    }
    console.log("Connected to the DB");
})



function execute(sql) {
   return new Promise ((resolve,reject) => {
       connection.query(sql, (err,result) => {
           if (err) {
               console.log("Error" + err);
               reject(err);
               return;
            };
        //    console.log(result);
           resolve(result);
       });
   });
}

function executeWithParameters(sql,parameters) {
    return new Promise ((resolve,reject) => {
        connection.query(sql,parameters, (err,result) => {
            if (err) {
                console.log("Error" + err);
                reject(err);
                return;
             };
            // console.log(result);
            resolve(result);
        });
    });
 }


function isCartForUSer(sql,parameters) {
   return new Promise ((resolve,reject) => {
       connection.query(sql,parameters, (err,result) => {
           if (err) {
               console.log("Error" + err);
               return;
            };
           // console.log(result);
           resolve(result);
       });
   });
}


// connection.query('SELECT * FROM users WHERE user_name = ? AND password = ?', [username, password], function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//     return result;
        
// });

module.exports = {
    execute,
    executeWithParameters,
    isCartForUSer
}