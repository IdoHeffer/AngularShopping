let connection = require("./connection")
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

async function getCart(id) {

    try{
        var sql = ("SELECT p.ProductName, p.img, ci.Amount, p.Price, ci.CartItemID, ci.TotalItemPrice, c.CartCreationDate,  c.CartID FROM products p  JOIN cartitems ci ON ci.ProductID=p.ProductID JOIN carts c ON ci.CartID=c.CartID WHERE UserID =? AND Status='OPEN'") 
        let parameters = [id];
        let cartData = await connection.executeWithParameters(sql,parameters);
        console.log(cartData);
        console.log(id);
        return cartData;
    }catch{
        cartData = [];
        return cartData;
    }
    
}

async function isCart(id) {


    try{
        var sql = ("SELECT * From carts WHERE UserID=? AND Status='OPEN'");
        let parameters = [id];
        let cartData = await connection.isCartForUSer(sql,parameters);
        if (cartData.length==0) {
            await this.addCart(id);
            console.log("We Are IN Dao Catch");
            this.isCart(id);
        }else{
            console.log("This down here is the cart Data from Dao =>");
            console.log(cartData);
            return cartData;

        }
        
    }catch{
        await this.addCart(id);
        console.log("We Are IN Dao Catch");
        this.isCart(id);
        // let sql1 = ("SELECT * From carts WHERE UserID=? );
        // let parameters1 = [id];
        // let cartData1 = await connection.isCartForUSer(sql1,parameters1);
        // Console.log("This down here is the cart Data from Dao =>");
        // console.log(cartData1.Status);
        // return cartData1
    }
}



async function addCart(UserID) {
    try {
        var sql = ("INSERT INTO marketproject.carts (UserID) VALUES (?)")
        let parameters = [UserID]
        let addeCart = await connection.executeWithParameters(sql,parameters);
        console.log("Cart Created in the DB :"+addeCart);
        return addeCart;
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }
  
}
async function updateCart(cart) {
    try {
        var sql = ("UPDATE marketproject.carts SET UserID = ? WHERE CartID = ? ");
        let parameters = [cart.UserID,cart.CartID]
        let updatedCart = await connection.executeWithParameters(sql,parameters);
        console.log("Cart Created in the DB :"+updatedCart)
        return updatedCart;
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }
    
}

async function deleteCart(id) {
    try {
        let sql1 = "delete from cartitems where CartID=?"
        let parameters1 = [id];
        await connection.executeWithParameters(sql1, parameters1);
    
        let sql2 = " delete from orders where CartID=?"
        let parameters2 = [id];
        await connection.executeWithParameters(sql2, parameters2);
    
        let sql = "DELETE FROM carts where CartID=?"
        let parameters = [id];
        let deletedCart = await connection.executeWithParameters(sql, parameters);
        console.log("Cart Returned FROM DB :"+deletedCart);
        return deletedCart;  
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }
}

async function getAllCarts() {
    try {
        var sql = ("SELECT * FROM carts") 
        let carts = await connection.execute(sql);
        console.log(carts);
        return carts;   
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }
   
}

async function getAllUserCart(id){
    try {
        var sql = ("SELECT * FROM carts WHERE UserID=?");
        let parameters = [id] 
        let allUserCarts = await connection.executeWithParameters(sql,parameters);
        console.log(allUserCarts);
        return allUserCarts;  
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }
   
}


let cart = {UserID:"5",CartID:"5"};
// getAllUserCart(5)
// updateCart(cart)
// console.log(order);
// updateOrder(order);
// getAllCarts()
// deleteCart(8)
// addCart(cart)
// getCart(1);

module.exports = {

    getCart,
    addCart,
    updateCart,
    deleteCart,
    getAllCarts,
    getAllUserCart,
    isCart
}