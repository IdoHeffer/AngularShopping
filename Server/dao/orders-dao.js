let connection = require("./connection")
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

async function getOrder(id) {
    try {
        var sql = ("SELECT * FROM orders WHERE OrderID =?") 
        let parameters = [id];
        let order = connection.executeWithParameters(sql,parameters);
        console.log("Order From DB"+order)
        return order;

    } catch (e) {
        console.log(e)
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
  
    
}

async function getOrderByCartId(id) {
    try {
        var sql = ("SELECT * FROM orders WHERE CartID =?") 
        let parameters = [id];
        let order = connection.executeWithParameters(sql,parameters);
        console.log("Order From DB"+order)
        return order;

    } catch (e) {
        console.log(e)
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
  
}





// sending an object includes UserID;
async function getOrdersByUserID(id){
    console.log(id);
    
    try {
        var sql = ("SELECT * FROM marketproject.orders WHERE UserID = ? ") 
        let parameters = [id];
        let userOrders = await connection.executeWithParameters(sql,parameters);
        console.log(userOrders)
        return userOrders;

    } catch (e) {
        console.log(e)
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
  
}

async function addOrder(order) {
    try {
        var sql = ("INSERT INTO marketproject.orders (UserID,CartID,FinalPrice,DeliveryCityAddress,DeliveryStreetAddress,DeliveryDate,CreditCardDigits) VALUES (?,?,?,?,?,?,?)")
        let parameters = [order.UserID,order.CartID,order.FinalPrice, order.DeliveryCityAddress,order.DeliveryStreetAddress,order.DeliveryDate,order.CreditCardDigits]
        let addeOrder = await connection.executeWithParameters(sql,parameters);
        let sql2 =  ("UPDATE marketproject.carts SET Status = 'CLOSED' WHERE CartID = ?");
        let parameters2 = [order.CartID];
        await connection.executeWithParameters(sql2,parameters2);
        console.log("Order is placed, the cart is closed.");
        console.log(addeOrder);
        return addeOrder;
    } catch (e) {
        console.log(e)
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
   
}

async function updateOrder(order) {
    try {
        var sql = ("UPDATE `marketproject`.`orders` SET UserID=? ,CartID=?,FinalPrice=?,DeliveryCityAddress=?,DeliveryStreetAddress=?,DeliveryDate=?, LastFourCreditCardDigits=? WHERE OrderID = ?");
        let parameters = [order.UserID,order.CartID,order.FinalPrice, order.DeliveryCityAddress,order.DeliveryStreetAddress,order.DeliveryDate,order.CreditCardDigits,order.OrderID]
        let updatedOrder = await connection.executeWithParameters(sql,parameters);
        console.log("Order Updated in the DB :"+updatedOrder)
        return updatedOrder;
    } catch (e) {
        console.log(e)
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
    
}
async function deleteOrder(id) {
    try {
        var sql = ("DELETE FROM orders WHERE OrderID =?");
        let parameters = [id] 
        await connection.executeWithParameters(sql,parameters);
        console.log("Order Deleted FROM DB");
    } catch (e) {
        console.log(e)
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
    
}

async function getAllOrders() {
    try{
        var sql = ("SELECT * FROM orders") 
        let orders = await connection.execute(sql);
        console.log("All Orders:"+orders);
        return orders;
    }catch(e){
        console.log(e)
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
    
}

async function getNumberAllOrders(){
    try{
        var sql = ("SELECT COUNT(OrderID) as numberoforders FROM orders")
        let numberOfOrders = await connection.execute(sql);
        console.log("Number of orders in Website :"+ numberOfOrders);
        return numberOfOrders;

    }catch(e){
        console.log(e)
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
    
}

async function getClosedOrder(cartID) {

    try{
        var sql = ("SELECT p.ProductName, p.picture, ci.Amount, p.Price, ci.CartItemID, ci.TotalItemPrice, c.CartCreationDate FROM products p  JOIN cartitems ci ON ci.ProductID=p.ProductID JOIN carts c ON ci.CartID=c.CartID WHERE c.CartID =?") 
        let parameters = [cartID];
        let cartData = await connection.executeWithParameters(sql,parameters);
        console.log(cartData);
        console.log("This down here is the ID PROVIDED");
        
        console.log(cartID);
        return cartData;
    }catch{
        console.log(e)
        cartData = [];
        return cartData;
    }
    
}


// let order = {OrderID:"8",UserID:"5",CartID:"1",FinalPrice:"509",DeliveryCityAddress:"Tel-Aviv",DeliveryStreetAddress:"HASHIKMA19",DeliveryDate:"2020-03-28",LastFourCreditCardDigits:"781"};
// console.log(order);
// updateOrder(order);
// getAllOrders()
// deleteOrder(8);
// getOrder(1);
// getOrdersByUserID(8)
// getNumberAllOrders()


module.exports = {

    getOrder,
    addOrder,
    updateOrder,
    deleteOrder,
    getAllOrders,
    getOrdersByUserID,
    getNumberAllOrders,
    getClosedOrder,
    getOrderByCartId
}