const productsDao = require("../dao/products-dao");
const Product = require("../models/product")
const validation = require("../validation/validation")

async function getProduct(id) {
    validation.validateId(id)
    let products = await productsDao.getProduct(id);
    validation.validateResponse(products)
    return product;
}

async function addProduct(product) {
    validateProduct(product);
    await productsDao.addProduct(product)
}

async function updateProduct(product) {
    validateProduct(product);
    await productsDao.updateProduct(product)
}

async function deleteProduct(id) {
    validation.validateId(id);
    let deleteResponse = await productsDao.deleteProduct(id)
    if (deleteResponse.affectedRows == 0) {
        throw new Error("no rows was delete");
    }
}


async function getAllProducts() {
    let products = await productsDao.getAllProducts();
    validation.validateResponse(products)
    return products;
}



function validateProduct(product) {
    const errorDetails = Product.validate(product);
    if (errorDetails) {
        throw new Error("invalid product"+errorDetails)
    }
}

// getProduct(5);

module.exports = {
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts
}