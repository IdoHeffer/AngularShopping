const connection = require("./connection")
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

//get all the categories
async function getAllCategories() {
    try {
        let sql = "SELECT * FROM categories"
        let categories = await connection.execute(sql);
        return categories
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }
    
}

// create new categorys
async function addCategory(category) {
    try {
        let sql = "INSERT INTO categories (CategoryName) VALUES (?) "
        let parameters = [category.CategoryName];
        let addedCategory = await connection.executeWithParameters(sql, parameters);
        console.log(addedCategory);

    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }
   
}

// update the categorys
async function updateCategory(category) {
    try {
        let sql = "update categories set  CategoryName=? WHERE CategoryID=?"
        let parameters = [category.CategoryName, category.CategoryID];
        await connection.executeWithParameters(sql, parameters);

    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }
    

}

//delete the categorys
async function deleteCategory(id) {
    try {
        let parameters = [id]
        let sql1 = "DELETE from cartitems c join products p on c.ProductID=p.ProductID where CategoryID=?"
        await connection.executeWithParameters(sql1, parameters);
        console.log("cartitems with this category was deleted")

        let sql2 = "DELETE from products where CategoryID=?"
        await connection.executeWithParameters(sql2, parameters);
        console.log("Products with this category was deleted");

        let sql = "DELETE FROM categories where CategoryID=?"
        let deleteResponce = await connection.executeWithParameters(sql, parameters);
        console.log("Category was Deleted with this category was deleted");
        return deleteResponce


    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }
    
}


//get  the products name from a singal categoryand the category name
async function getAllProductsInCategory(id) {
    try {
        let sql = "select p.ProductName, p.ProductID,p.CategoryID,p.Price,p.picture ,c.CategoryName from categories c join products p on p.CategoryID=c.CategoryID where c.CategoryID=?"
        let parameters = [id];
        let products = await connection.executeWithParameters(sql, parameters);
        console.log(products)
        return products

    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }
    
}


// let category = { CategoryName:"Wines & Beers", CategoryID:"8" }
// addCategory(category)
// getAllProductsInCategory(1)
// getAllCategories()
// updateCategory(category)

// deleteCategory(7);


module.exports = {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    getAllProductsInCategory
}