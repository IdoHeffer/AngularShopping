const cartItemsLogic = require("../logic/cartItems-logic")
const express = require("express")
const router = express.Router();


// router.get("/:id", async (request, response) => {
//     try {
//         let cartitems = await cartItemsLogic.getOneCartItem();
//         response.json(cartitems);

//     } catch (error) {
//         response.status(404).send("cant get cart item" +error);
//     }
// });


router.get("/:id", async (request, response) => {
    let id = +request.params.id;
    try {
        let cartitems = await cartItemsLogic.getAllCartItems(id);
        response.json(cartitems);

    } catch (error) {
        response.status(404).send("cant get cart item" +error);
    }
});



router.put("/", async (request, response) => {
    let item = request.body;
    try {
        await cartItemsLogic.updateCartItem(item)
        response.status(200).send("updat succesful")

    } catch (error) {
        response.status(404).send("No item in database  "+error);
    }
})

router.post("/", async (request, response) => {
    let itemtoAdd = request.body;
    try {
        await cartItemsLogic.addCartItem(itemtoAdd)
        response.status(200).send("item was added")

    } catch (error) {
        response.status(404).send("cant add item" +error);
    }
})

router.delete("/:id", async (request, response) => {
    let id = +request.params.id;
    try {
        await cartItemsLogic.deleteCartItem(id);
        response.status(200).send("item was deleted from database");
    } catch (error) {
        response.status(404).send("cant delete item" +error);
    }
});


module.exports = router;