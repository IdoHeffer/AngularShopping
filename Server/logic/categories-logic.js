const categoriesDao = require("../dao/categories-dao")
const Category = require("../models/category.js")
const validation = require("../validation/validation")


async function getAllCategories() {
    let categories = await categoriesDao.getAllCategories();
    validation.validateResponse(categories)
    return categories;
}

async function deleteCategory(id) {
    validation.validateId(id)
    let deleteResponce = await categoriesDao.deleteCategory(id)
    if (deleteResponce.affectedRows == 0) {
        throw new Error("no rows was delete");
    }
}

async function addCategory(category) {
    validateCategory(category)
    await categoriesDao.addCategory(category)
}

async function updateCategory(category) {
    validateCategory(category)
    await categoriesDao.updateCategory(category)
}

async function getAllProductsInCategory(id) {
    validation.validateId(id)
    let productsOfCategory = await categoriesDao.getAllProductsInCategory(id);
    validation.validateResponse(productsOfCategory)
    return productsOfCategory;
}



function validateCategory(category) {
    // Validate the category to add:
    const errorDetails = Category.validate(category);
    if (errorDetails) {
        throw new Error("invalid category"+ errorDetails);
    }
}

let category = { CategoryName:"Fruits", CategoryID:"10"}
// getAllCategories()
// addCategory(category)
// updateCategory(category)
// deleteCategory(10)
// getAllProductsInCategory(1)

module.exports = {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    getAllProductsInCategory


}