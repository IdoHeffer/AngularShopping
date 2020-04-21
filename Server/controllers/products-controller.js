const express = require("express")
const productLogic = require("../logic/products-logic")
const router = express.Router();
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");



router.get("/", async (request, response) => {
    try {
        let products = await productLogic.getAllProducts();
        response.json(products);

    } catch (error) {
        response.status(404).send("No products in database" +error);
    }
});

router.get("/:id", async (request, response) => {
    let id = +request.params.id
    try {
        let product = await productLogic.getProduct(id);
        response.json(product);

    } catch (error) {
        response.status(404).send("No products in database" +error);
    }
});

router.put("/", async (request, response) => {
    let product = request.body;
    try {
        await productLogic.updateProduct(product)
        response.status(200).send("updat succesful")

    } catch (error) {
        response.status(404).send("No product in database" +error);
    }
})

router.post("/", async (request, response) => {
    let product = request.body;
    try {
        await productLogic.addProduct(product)
        response.status(200).send("product was added")

    } catch (error) {
        response.status(404).send("cant add product" +error);
    }
})

router.delete("/:id", async (request, response) => {
    let id = +request.params.id
    try {
        await productLogic.deleteProduct(id);
        response.status(200).send("product was deleted from database");
    } catch (error) {
        response.status(404).send("cant delete product" +error);
    }
});


module.exports = router;
