const ordersDao = require("../dao/orders-dao")
const usersDao = require("../dao/users-dao");
const cartItemsDao = require("../dao/cartItems-dao")
const Order = require("../models/order")
const productsDao = require("../dao/products-dao");
const Product = require("../models/product")
const fileHandler = require("../hendlers/file-handler");
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
    await writeToFile(order.CartID, order.UserID,addResponse.OrderID);
    console.log("down here is the orderID ");

    
    console.log(addResponse.OrderID);
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


async function writeToFile(CartID, UserID,OrderID) {
    //getting the user inpormation for the first and last name
    let userInformation = await usersDao.getUser(UserID)
    //getting the user order for the order id and the total sum
    let userOrder = await ordersDao.getOrder(CartID)
    console.log("Donw here is the the Order");
    console.log(userOrder);
    
    await fileHandler.writeFile("./data/recipt.txt", "hello " + userInformation[0].FirstName + " " + userInformation[0].LastName + "\n" + "order number: " + userOrder.OrderID + "\n");
    //geting all the products in the cart for the recipt
    let cartItem = await cartItemsDao.getAllCartItems(CartID);    
    for (let index = 0; index < cartItem.length; index++) {
        let productfromDb = await productsDao.getProduct(cartItem[index].ProductID);
        await fileHandler.appendFile("./data/recipt.txt", "\n" + (index + 1) + " - " + productfromDb[index].ProductName + " X " + cartItem[index].Amount + " = " + cartItem[index].TotalItemPrice)
    }
    console.log("Donw here is the cartItems");
    console.log(cartItem);
    await fileHandler.appendFile("./data/recipt.txt", "\n" + "total order: " + userOrder.FinalPrice);
}



module.exports = {
    getAllOrders,
    getOrder,
    updateOrder,
    addOrder,
    deleteOrder,
    getNumberAllOrders,
    getAllUserOrders,
    getClosedOrder,
    writeToFile
    


}