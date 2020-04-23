let connection = require("./connection")
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

async function getProduct(id) {
    var sql = ("SELECT * FROM products WHERE ProductID =?")
    let parameters =  [id]; 
    connection.executeWithParameters(sql,parameters);
    console.log("connected");
    return null;
}
async function addProduct(product) {
   var sql = ("INSERT INTO marketproject.products (ProductName,CategoryID,Price) VALUES (?,?,?)");
   let parameters = [product.ProductName,product.CategoryID,product.Price]
   let addedProduct = await connection.executeWithParameters(sql,parameters);
   console.log("Product Created in the DB :"+addedProduct);
   return addedProduct;
}
async function updateProduct(product) {
    var sql = ("UPDATE marketproject.products SET ProductName=?,CategoryID=?,Price =?, img=? WHERE ProductID = ?");
   let parameters = [product.ProductName,product.CategoryID,product.Price,product.img, product.ProductID]
   let updatedProduct = await connection.executeWithParameters(sql,parameters);
   console.log("Product Updated in the DB :"+updatedProduct);
   return updatedProduct;
}
async function deleteProduct(id) {
    var sql = ("DELETE FROM marketproject.products WHERE ProductID = ?");
    let parameters = [id]
    let deletedProduct = await connection.executeWithParameters(sql,parameters);
    console.log("Product Deleted from the DB :"+deletedProduct);
    return deletedProduct;
}
async function getAllProducts() {
    var sql = ("SELECT * FROM products") 
   let products = await connection.execute(sql);
    console.log(products);
    return products;
}

let product = {ProductID:"7",ProductName:"Baguette", CategoryID:"6",Price:"10.00" };
// updateProduct(product)
// deleteProduct(12);


module.exports = {

    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts
}