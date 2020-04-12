let connection = require("./connection")

async function getOneCartItem(CartItemID) {
    var sql = ("SELECT * FROM cartitems WHERE CartItemID=?") 
    let parameters = [CartItemID];
    let cartitem = connection.executeWithParameters(sql,parameters);
    console.log("Cart item From DB"+cartitem)
    return cartitem;
}

async function getAllCartItems(CartID) {
    var sql = ("SELECT * FROM cartitems WHERE CartID=?") 
    let parameters = [CartID];
    let allcartitems = connection.executeWithParameters(sql,parameters);
    console.log("Cart item From DB"+allcartitems)
    return allcartitems;
}

async function addCartItem(cartItem) {
   var sql = ("INSERT INTO `marketproject`.`cartitems` (`ProductID`, `Amount`, `TotalItemPrice`, `CartID`)  VALUES (?,?,?,?)")
   let parameters = [cartItem.ProductID,cartItem.Amount,cartItem.TotalItemPrice,,cartItem.CartID]
   let addeCartItem = await connection.executeWithParameters(sql,parameters);
   console.log("Cart Created in the DB :"+addeCartItem);
}
async function updateCartItem(cartItem) {
    var sql = ("UPDATE marketproject.cartitems SET ProductID = ?,Amount = ?,TotalItemPrice = ? , CartID= ?  WHERE CartItemID = ? ");
    let parameters = [cartItem.ProductID,cartItem.Amount,cartItem.TotalItemPrice,cartItem.CartID,cartItem.CartItemID]
    let updatedCart = await connection.executeWithParameters(sql,parameters);
    console.log("Cart Created in the DB :"+updatedCart)
    return updatedCart;
}
async function deleteCartItem(id) {
    var sql = ("DELETE FROM cartitems WHERE CartItemID =?");
    let parameters = [id] 
    let deletedCart = await connection.executeWithParameters(sql,parameters);
    console.log("Cart Returned FROM DB :"+deletedCart);
}

async function deleteAllSpecificCartItems(id) {
    var sql = ("DELETE FROM cartitems WHERE CartID =?");
    let parameters = [id] 
    let deletedCart = await connection.executeWithParameters(sql,parameters);
    console.log("Cart Returned FROM DB :"+deletedCart);
}

async function getAllCartItems(CartID) {
    var sql = ("SELECT * FROM cartitems WHERE CartID=?") 
    let parameters = [CartID] 
    let cartItems = await connection.executeWithParameters(sql,parameters);
    console.log(cartItems);
    return cartItems;
}


let cartItem = {ProductID:"5",Amount:"7",TotalItemPrice:"25",CartID:"5",CartItemID:"1"};
// getCartItem(cartItem)
// getAllCartItems(5)
// getAllUserCart(5)
// updateCart(cart)
// console.log(order);
// updateOrder(order);
// getAllCarts()
// deleteCart(8)
// addCart(cart)
// getCart(1);
// updateCartItem(cartItem)
// getOneCartItem(3)

module.exports = {

    getOneCartItem,
    addCartItem,
    updateCartItem,
    deleteCartItem,
    getAllCartItems,
    deleteAllSpecificCartItems,
    getAllCartItems
    
}