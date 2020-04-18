const ordersDao = require("../dao/orders-dao")
const Order = require("../models/order")
const validation = require("../validation/validation")

async function getAllOrders() {
    let orders = await ordersDao.getAllOrders();
    console.log(orders)
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
    await ordersDao.addOrder(order)
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
    console.log(numberOfOrders)
    // validation.validateResponse(numberOfOrders)
    return numberOfOrders;
}

// let order = { OrderID:"13", UserID:"11", CartID:"7", FinalPrice:"1254", DeliveryCityAddress:"Petah-Tikva", DeliveryStreetAddress:"Thereza 4", DeliveryDate:"2020-03-28",LastFourCreditCardDigits:"5555" }
// addOrder(order);
// getAllOrders();
// getOrder(5);
// deleteOrder(12);
// updateOrder(order)



module.exports = {
    getAllOrders,
    getOrder,
    updateOrder,
    addOrder,
    deleteOrder,
    getNumberAllOrders
    


}