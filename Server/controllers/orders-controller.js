const ordersLogic = require("../logic/orders-logic")
const express = require("express")
const router = express.Router();
const mapUser = require("../middleware/map")
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

router.get("/", async (request, response) => {
    try {
        let orders = await ordersLogic.getAllOrders();
        response.json(orders);

    } catch (error) {
        response.status(404).send("No orders in database" +error);
    }
});

router.get("/:id", async (request, response) => {
    let id = +request.params.id
    try {
        let userOrder = await ordersLogic.getOrder(id);
        response.json(userOrder);

    } catch (error) {
        response.status(404).send("No orders for user" +error);
    }
});


router.put("/", async (request, response) => {
    let order = request.body;
    try {
        await ordersLogic.updateOrder(order)
        response.status(200).send("update succesfully")

    } catch (error) {
        response.status(404).send("No order in database" +error);
    }
})

router.post("/", async (request, response) => {
    let token = request.headers.authorization;
    let id = mapUser.checkMapForUserId(token);
    let order ={
       UserID : id,
       CartID : request.body.CartID,
       FinalPrice : request.body.FinalPrice,
       DeliveryCityAddress : request.body.DeliveryCityAddress,
       DeliveryStreetAddress : request.body.DeliveryStreetAddress,
       CreditCardDigits : request.body.CreditCardDigits
    } 
    try {
        await ordersLogic.addOrder(order)
        response.status(200).send("order was added")

    } catch (error) {
        response.status(404).send("cant add order" +error);
    }
})

router.delete("/:id", async (request, response) => {
    let id = +request.params.id
    try {
        await ordersLogic.deleteOrder(id);
        response.status(200).send("order was deleted from database");
    } catch (error) {
        response.status(404).send("cant delete order" +error);
    }
});


router.get("/numberoforders", async (request, response) => {
    console.log(1);
    try {
        let numberOfOrders = await ordersLogic.getNumberAllOrders();
        console.log(numberOfOrders);
        response.json(numberOfOrders);

    } catch (error) {
        response.status(404).send("No orders in database" +error);
    }
});


module.exports = router;