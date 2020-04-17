let connection = require("./connection")

async function getCart(id) {
    var sql = ("SELECT p.ProductName, p.img, ci.Amount, p.Price, ci.CartItemID, ci.TotalItemPrice, c.CartCreationDate,  c.CartID FROM products p  JOIN cartitems ci ON ci.ProductID=p.ProductID JOIN carts c ON ci.CartID=c.CartID WHERE UserID =?") 
    let parameters = [id];
    let cartData = await connection.isCartForUSer(sql,parameters);
    console.log(cartData)
    if (cartData.length==0) {
        console.log("no carts for user but we will create one")
        var sql1 = ("INSERT INTO marketproject.carts (UserID) VALUES (?)")
        let parameters1 = [id]
        let addeCart = await connection.executeWithParameters(sql1,parameters1);
        console.log(addeCart);
        let newUserCart = await connection.isCartForUSer(sql,parameters);
        return addeCart;
    }else{
        console.log(id)
        console.log(cartData);
        return cartData;
    }
    
}

async function addCart(UserID) {
   var sql = ("INSERT INTO marketproject.carts (UserID) VALUES (?)")
   let parameters = [UserID]
   let addeCart = await connection.executeWithParameters(sql,parameters);
   console.log("Cart Created in the DB :"+addeCart);
   return addeCart;
}
async function updateCart(cart) {
    var sql = ("UPDATE marketproject.carts SET UserID = ? WHERE CartID = ? ");
    let parameters = [cart.UserID,cart.CartID]
    let updatedCart = await connection.executeWithParameters(sql,parameters);
    console.log("Cart Created in the DB :"+updatedCart)
    return updatedCart;
}

async function deleteCart(id) {

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
}

async function getAllCarts() {
    var sql = ("SELECT * FROM carts") 
   let carts = await connection.execute(sql);
    console.log(carts);
    return carts;
}

async function getAllUserCart(id){
    var sql = ("SELECT * FROM carts WHERE UserID=?");
    let parameters = [id] 
    let allUserCarts = await connection.executeWithParameters(sql,parameters);
    console.log(allUserCarts);
    return allUserCarts;
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
    getAllUserCart
}