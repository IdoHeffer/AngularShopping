let connection = require("./connection")
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

async function getOneCartItem(CartItemID) {
    var sql = ("SELECT * FROM cartitems WHERE CartItemID=?") 
    let parameters = [CartItemID];
    let cartitem = connection.executeWithParameters(sql,parameters);
    // console.log("Cart item From DB"+cartitem)
    return cartitem;
}

async function getAllCartItems(CartID) {
    var sql = ("SELECT * FROM cartitems WHERE CartID=?") 
    let parameters = [CartID];
    let allcartitems = connection.executeWithParameters(sql,parameters);
    // console.log("Cart item From DB"+allcartitems)
    return allcartitems;
}

async function addCartItem(cartItem) {
    let checktwice = await IsProdTwiceINCart(cartItem);
    if (checktwice==true) {
        return;
    }
   var sql = ("INSERT INTO `marketproject`.`cartitems` (`ProductID`, `Amount`, `TotalItemPrice`, `CartID`)  VALUES (?,?,?,?)")
   let parameters = [cartItem.ProductID,cartItem.Amount,cartItem.TotalItemPrice,cartItem.CartID]
   let addeCartItem = await connection.executeWithParameters(sql,parameters);
   console.log("Cart Created in the DB :"+addeCartItem);
}
async function updateCartItem(cartItem) {
    var sql = ("UPDATE marketproject.cartitems SET Amount = ?,TotalItemPrice = ?  WHERE CartID= ? and ProductID= ?");
    let parameters = [cartItem.Amount,cartItem.TotalItemPrice,cartItem.CartID,cartItem.ProductID,]
    let updatedCart = await connection.executeWithParameters(sql,parameters);
    console.log(updatedCart)
    return updatedCart;
}

async function deleteCartItem(id) {
    var sql = ("DELETE FROM cartitems WHERE CartItemID =?");
    let parameters = [id] 
    let deletedCart = await connection.executeWithParameters(sql,parameters);
    console.log(deletedCart);
}

async function deleteAllCartItems(id) {
    var sql = ("DELETE FROM cartitems WHERE CartID =?");
    let parameters = [id] 
    let deletedCart = await connection.executeWithParameters(sql,parameters);
    console.log(deletedCart);
}

async function getAllCartItems(CartID) {
    var sql = ("SELECT * FROM cartitems WHERE CartID=?") 
    let parameters = [CartID] 
    let cartItems = await connection.executeWithParameters(sql,parameters);
    console.log(cartItems);
    return cartItems;
}

// func that check if user is trying to add existing product on cart. 
// it should be updated not added.
async function IsProdTwiceINCart(cartItem){
    let sql = ("SELECT * FROM cartitems WHERE CartID=?")
    let parameters = [cartItem.CartID];
    let currentcartItems = await connection.executeWithParameters(sql,parameters);
    console.log(currentcartItems);
    for (let index = 0; index < currentcartItems.length; index++) {
        if (cartItem.ProductID==currentcartItems[index].ProductID) {
            updateCartItem(cartItem);
            console.log("product exists in this cart it us being updated and not added");
            return true;
        }
        
    }

    return false;

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
    deleteAllCartItems,
    getAllCartItems
    
}