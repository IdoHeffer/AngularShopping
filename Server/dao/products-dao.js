let connection = require("./connection")
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

async function getProduct(id) {
  try {
    var sql = ("SELECT * FROM products WHERE ProductID =?")
    let parameters =  [id]; 
    connection.executeWithParameters(sql,parameters);
    console.log("connected");
    return null;
    } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }  

}
async function addProduct(product) {
    try {
        var sql = ("INSERT INTO marketproject.products (ProductName,CategoryID,Price,img) VALUES ( ?,?,?,? )");
        let parameters = [product.ProductName,product.CategoryID,product.Price,product.img]
        let addedProduct = await connection.executeWithParameters(sql,parameters);
        console.log("Product Created in the DB :"+addedProduct);
        return addedProduct;
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }  
   
}
async function updateProduct(product) {
    try {
        var sql = ("UPDATE marketproject.products SET ProductName=?,CategoryID=?,Price =?, img=? WHERE ProductID = ?");
        let parameters = [product.ProductName,product.CategoryID,product.Price,product.img, product.ProductID]
        let updatedProduct = await connection.executeWithParameters(sql,parameters);
        console.log("Product Updated in the DB :"+updatedProduct);
        return updatedProduct;
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }  
    
}
async function deleteProduct(id) {
    try {
        var sql = ("DELETE FROM marketproject.products WHERE ProductID = ?");
        let parameters = [id]
        let deletedProduct = await connection.executeWithParameters(sql,parameters);
        console.log("Product Deleted from the DB :"+deletedProduct);
        return deletedProduct;
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }  
  
}
async function getAllProducts() {
    try {
        var sql = ("SELECT * FROM products") 
        let products = await connection.execute(sql);
        console.log(products);
        return products;
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }  
   
}

async function updateProductImageName(fileName){
    let sql = "SELECT id from products ORDER BY lastChangeDate DESC LIMIT 1"
    let id= await connection.execute(sql)
    let sql2="UPDATE products set picture=? where ProductID=?"
    let parameters= [fileName , id[0].id]
    await connection.executeWithParameters(sql2,parameters)
}

let product = {ProductID:"7",ProductName:"Baguette", CategoryID:"6",Price:"10.00" };
// updateProduct(product)
// deleteProduct(12);


module.exports = {

    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    updateProductImageName
}