const cartItemsLogic = require("../logic/cartitems-logic");
const express = require("express")
const router = express.Router();
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");



router.get("/:id", async (request, response) => {
    let id = +request.params.id;
    try {
        let cartitems = await cartItemsLogic.getAllCartItems(id);
        response.json(cartitems);

    } catch (error) {
        response.status(500).send("cant get cart item" +error);
    }
});



router.put("/", async (request, response) => {
    let item = request.body;
    try {
        await cartItemsLogic.updateCartItem(item)
        response.status(200).send("updat succesful");

    } catch (error) {
        response.status(500).send("No item in database  "+error);
    }
})

router.post("/", async (request, response) => {
    let itemtoAdd = request.body;
    try {
        await cartItemsLogic.addCartItem(itemtoAdd)
        response.status(200);

    } catch (error) {
        response.status(500).send("cant add item" +error);
    }
})

router.delete("/:id", async (request, response) => {
    let id = +request.params.id;
    try {
        await cartItemsLogic.deleteCartItem(id);
        response.status(200).send("item was deleted from database");
    } catch (error) {
        response.status(500).send("cant delete item" +error);
    }
});

router.delete("/deleteAll/:id", async (request, response) => {
    let id = +request.params.id;
    try {
        await cartItemsLogic.deleteAllCartItems(id);
        response.status(200).send("item was deleted from database");
    } catch (error) {
        response.status(500).send("cant delete item" +error);
    }
});


module.exports = router;