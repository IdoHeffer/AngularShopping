const express = require("express")
const productLogic = require("../logic/products-logic")
const router = express.Router();
const fs = require("fs");
const uuid = require("uuid");



router.get("/", async (request, response) => {
    try {
        let products = await productLogic.getAllProducts();
        response.json(products);

    } catch (error) {
        response.status(404).send(error);
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
        response.status(404).send(error);
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


router.post("/file", async (request, response) => {
    console.log("1")
    if (!fs.existsSync("./uploads")) { // Must create "/uploads" folder if not exist.
    fs.mkdirSync("./uploads");
    }

    try {      

        // Extract the uploaded image
        // IMPORTANT - The "image" property is implanted by the "express-fileupload"
        // middleware
        const file = request.files.file;

        // Extracting the uploaded file's extension (e.g. yossi.png or yossi.zip)
        const extension = file.name.substr(file.name.lastIndexOf("."));
     
        // Generating a unique identifier in order to prevent conflicts between 
        // files with the same name - yet different
        let newUuidFileName = uuid.v4();

        // using mv(), which is a built in command on the file object
        // we move the file into the uploads directory
        file.mv("./uploads/" + newUuidFileName + extension); // E.g: "C:\my-project\uploads\204b3caf-9e37-4600-9537-9f7b4cbb181b.jpg"
        let newImageFullName=newUuidFileName+extension
        console.log(newImageFullName)
        // returning the product object
        response.status(200).json();
        ////updating the product name after upload
        await productLogic.updateProductImageName(newImageFullName);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});




module.exports = router;
