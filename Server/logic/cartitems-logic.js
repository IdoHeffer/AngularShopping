const cartItemsDao = require("../dao/cartItems-dao")
const CartItem = require("../models/cartitem")
const validation = require("../validation/validation")
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

async function deleteCartItem(id) {
    // validation.validatId(id)
    let deleteResponse = await cartItemsDao.deleteCartItem(id)
    if (deleteResponse.affectedRows == 0) {
        throw new Error("no rows was delete");
    }
}


async function deleteAllCartItems(id) {
    // validation.validatId(id)
    let deleteResponse = await cartItemsDao.deleteAllCartItems(id)
    if (deleteResponse.affectedRows == 0) {
        throw new Error("no rows was delete");
    }
}


async function getAllCartItems(CartID){
    validation.validateId(CartID)
    let allCartItems = await cartItemsDao.getAllCartItems(CartID)
    return allCartItems;
}

async function getOneCartItem(CartItemID){
    validation.validateId(CartItemID)
    let oneCartItem = await cartItemsDao.getOneCartItem(CartItemID)
    return oneCartItem;
}
 
async function getAllCartItems(CartID){
    validation.validatId(CartID)
    let allCartItems = await cartItemsDao.getAllCartItems(CartID)
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

module.exports = {
    addCartItem,
    deleteCartItem,
    updateCartItem,
    getAllCartItems,
    getOneCartItem,
    getAllCartItems,
    deleteAllCartItems
}