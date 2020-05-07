const ordersDao = require("../dao/orders-dao")
const Order = require("../models/order")
const validation = require("../validation/validation")
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

async function getAllOrders() {
    let orders = await ordersDao.getAllOrders();
    validation.validateResponse(orders)
    return orders;
}

async function getOrder(id) {
    validation.validateId(id)
    let order = await ordersDao.getOrder(id)
    validation.validateResponse(order)
    return order
}

async function deleteOrder(id) {
    validation.validateId(id)
    let deleteResponse = await ordersDao.deleteOrder(id)
    if (deleteResponse == 0) {
        throw new Error("no row was deleted");
    }
}

async function addOrder(order) {
    // validateOrder(order);
    let addResponse = await ordersDao.addOrder(order);
    return addResponse;
}

async function updateOrder(order) {
    validateOrder(order)
    let updatedOrder = await ordersDao.updateOrder(order)
    console.log("Updated order"+updatedOrder);
}


function validateOrder(order) {
    const errorDetails = Order.validate(order);
    if (errorDetails) {
        throw new Error("invalid order information"+errorDetails)
    }
}

async function getNumberAllOrders(){
    let numberOfOrders = await ordersDao.getNumberAllOrders();
    // validation.validateResponse(numberOfOrders)
    return numberOfOrders;
}


async function getAllUserOrders(id) {
    let orders = await ordersDao.getOrdersByUserID(id);
    validation.validateResponse(orders)
    return orders;
}

async function getClosedOrder(cartID) {
    let orders = await ordersDao.getClosedOrder(cartID);
    return orders;
}


module.exports = {
    getAllOrders,
    getOrder,
    updateOrder,
    addOrder,
    deleteOrder,
    getNumberAllOrders,
    getAllUserOrders,
    getClosedOrder
    


}