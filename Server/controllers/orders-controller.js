const ordersLogic = require("../logic/orders-logic")
const express = require("express")
const router = express.Router();
const mapUser = require("../middleware/map")
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

//getting the recipt for the user- needs work and test
router.get("/recipt/download", async (request, response, next) => {

    try {
        let recipt = "./data/recipt.txt";
        response.download(recipt);

    } catch (error) {
        return next(error);
    }
});

router.get("/Closedorder/:id", async (request, response) => {
    let cartID= +request.params.id;
    try {
        let orders = await ordersLogic.getClosedOrder(cartID);
        response.json(orders);

    } catch (error) {
        return next(error);
    }
});


router.get("/", async (request, response) => {
    try {
        let orders = await ordersLogic.getAllOrders();
        response.json(orders);

    } catch (error) {
        return next(error);
    }
});

router.get("/myorders/allorders", async (request, response) => {
    let token = request.headers.authorization;
    let id = mapUser.checkMapForUserId(token);
    console.log(id);
    try {
        let userOrders = await ordersLogic.getAllUserOrders(id);
        response.json(userOrders);

    } catch (error) {
        return next(error);
    }
});


router.put("/", async (request, response) => {
    let order = request.body;
    try {
        await ordersLogic.updateOrder(order)
        response.status(200).send("update succesfully")

    } catch (error) {
        return next(error);
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
       DeliveryDate : request.body.DeliveryDate,
       CreditCardDigits : request.body.CreditCardDigits
    } 
    try {
        await ordersLogic.addOrder(order)
        response.status(200).send("order was added")

    } catch (error) {
        return next(error);
    }
})

router.delete("/:id", async (request, response) => {
    let id = +request.params.id
    try {
        await ordersLogic.deleteOrder(id);
        response.status(200).send("order was deleted from database");
    } catch (error) {
        return next(error);
    }
});


router.get("/numberoforders", async (request, response, next) => {
    console.log(1);
    let requestValue = request.body;
    console.log(requestValue);
    try {
        let numberOfOrders = await ordersLogic.getNumberAllOrders();
        console.log(numberOfOrders);
        response.json(numberOfOrders);

    } catch (error) {
        error = GENERAL_ERROR;
        return next(error);
    }
});


router.get("/:id", async (request, response) => {
    let id = +request.params.id
    try {
        let userOrder = await ordersLogic.getOrder(id);
        response.json(userOrder);

    } catch (error) {
        return next(error);
    }
});







module.exports = router;