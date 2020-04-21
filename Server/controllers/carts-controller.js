const cartsLogic = require("../logic/carts-logic")
const express = require("express")
const router = express.Router();
const mapUser = require("../middleware/map");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");


router.get("/usercart", async (request, response) => {
    let token = request.headers.authorization
    let id = mapUser.checkMapForUserId(token)
    console.log(id);
    try {
        let userCart = await cartsLogic.getCart(id);
        console.log(userCart);
        response.json(userCart);

    } catch (error) {
        response.status(404).send("No cart for user in database" + error);
    }
});

router.get("/iscart", async (request, response) => {
    let token = request.headers.authorization;
    let id = mapUser.checkMapForUserId(token)
    console.log(id);
    try {
        let userCart = await cartsLogic.isCart(id);
        console.log(userCart);
        response.json(userCart);

    } catch (error) {
        let userCart = await cartsLogic.isCart(id);
        console.log(userCart);
        response.status(404).send("No cart for user in database" + error);
    }
});

router.get("/", async (request, response) => {
    try {
        let carts = await cartsLogic.getAllCarts();
        response.json(carts);

    } catch (error) {
        response.status(404).send("No carts in database" +error);
    }
});

router.get("/:id", async (request, response) => {
    let id = +request.params.id
    try {
        let userCart = await cartsLogic.getCart(id);
        response.json(userCart);

    } catch (error) {
        response.status(404).send("No cart for user in database" + error);
    }
});

router.post("/", async (request, response) => {
    let token = request.headers.authorization;
    let id = mapUser.checkMapForUserId(token);
    try {
        await cartsLogic.addCart(id)
        response.status(200).send("cart was added")

    } catch (error) {
        response.status(404).send("cant add cart" +error);
    }
})

router.delete("/:id", async (request, response) => {
    let id = +request.params.id
    try {
        await cartsLogic.deleteCart(id);
        response.status(200).send("cart was deleted from database");
    } catch (error) {
        response.status(404).send("cant delete cart" +error);
    }
});


module.exports = router;