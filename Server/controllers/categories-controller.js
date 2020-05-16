const categoriesLogic = require("../logic/categories-logic")
const express = require("express")
const router = express.Router();
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

router.get("/", async (request, response) => {
    try {
        let categories = await categoriesLogic.getAllCategories();
        response.json(categories);

    } catch (error) {
        response.status(500).send("No products in database" +error);
    }
});

router.get("/:id", async (request, response) => {
    let id = +request.params.id
    try {
        let productsOfCategory = await categoriesLogic.getAllProductsInCategory(id);
        response.json(productsOfCategory);

    } catch (error) {
        response.status(500).send("No products in database in this category" +error);
    }
});


router.put("/", async (request, response) => {
    let category = request.body;
    try {
        await categoriesLogic.updateCategory(category)
        response.status(200).send("update succesful")

    } catch (error) {
        response.status(500).send("No category in database" +error);
    }
})

router.post("/", async (request, response) => {
    let category = request.body;
    try {
        await categoriesLogic.addCategory(category)
        response.status(200).send("category was added");

    } catch (error) {
        response.status(500).send("cant add category" +error);
    }
})

// Have A Problem Here nEED TO CHRCK IT.
router.delete("/:id", async (request, response) => {
    let id = +request.params.id
    try {
        await categoriesLogic.deleteCategory(id);
        response.status(200).send("category was deleted from database");
    } catch (error) {
        response.status(500).send("cant delete category" +error);
    }
});


module.exports = router;