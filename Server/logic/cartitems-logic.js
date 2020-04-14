const cartItemsDao = require("../dao/cartItems-dao")
const CartItem = require("../models/cartitem")
const validation = require("../validation/validation")

async function deleteCartItem(id) {
    validation.validatId(id)
    let deleteResponce = await cartItemsDao.deleteCartItem(id)
    if (deleteResponce.affectedRows == 0) {
        throw new Error("no rows was delete");
    }
}

async function getAllCartItems(CartID){
    validation.validateId(CartID)
    let allCartItems = await cartItemsDao.getAllCartItems(CartID)
    console.log(allCartItems);
    return allCartItems;
}

async function getOneCartItem(CartItemID){
    validation.validateId(CartItemID)
    let oneCartItem = await cartItemsDao.getOneCartItem(CartItemID)
    console.log(oneCartItem);
    return oneCartItem;
}
 
async function getAllCartItems(CartID){
    validation.validatId(CartID)
    let allCartItems = await cartItemsDao.getAllCartItems(CartID)
    console.log(allCartItems);
    return allCartItems;
}

async function addCartItem(cartItem) {
    validateCartItem(cartItem)
    await cartItemsDao.addCartItem(cartItem)
}

async function updateCartItem(cartItem) {
    validateCartItem(cartItem)
    await cartItemsDao.updateCartItem(cartItem)
}

function validateCartItem(cartItem) {
    // Validate the category to add:
    const errorDetails = CartItem.validate(cartItem);
    if (errorDetails) {
        throw new Error("invalid item")
    }
}

// getOneCartItem(2)

module.exports = {
    addCartItem,
    deleteCartItem,
    updateCartItem,
    getAllCartItems,
    getOneCartItem,
    getAllCartItems
}