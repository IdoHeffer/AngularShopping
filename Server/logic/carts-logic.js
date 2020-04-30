const cartsDao = require("../dao/carts-dao")
const validation = require("../validation/validation")
const Cart = require("../models/cart");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

async function getAllCarts() {
    let carts = await cartsDao.getAllCarts();
    validation.validateResponse(carts)
    return carts;
}

async function getCart(id) {
    validation.validateId(id)
    let userCart = await cartsDao.getCart(id);
    validation.validateResponse(userCart)
    if (userCart[0].status=="CLOSED"){
        let addedCart =  await addCart(id);
        return addedCart
    }
    return userCart;
}

async function isCart(id) {

    try{
        validation.validateId(id)
        let userCart = await cartsDao.isCart(id);
        validation.validateResponse(userCart)
        return userCart;
    }catch{
       console.log("Error !!!!!!!");
       console.log(err);
       this.isCart(id);
    }
    
}

async function deleteCart(id) {
    validation.validateId(id)
    let deleteResponce = await cartsDao.deleteCart(id)
    if (deleteResponce.affectedRows == 0) {
        throw new Error("no rows was delete");
    }
}

async function addCart(id) {
    validateCart(id);
    let addedCart = await cartsDao.addCart(id);
    return addedCart;
}

function validateCart(cart) {
    const errorDetails = Cart.validate(cart);
    if (errorDetails) {
        throw new Error("invalid order information"+errorDetails)
    }
}






module.exports = {
    getAllCarts,
    getCart,
    addCart,
    deleteCart,
    isCart


}