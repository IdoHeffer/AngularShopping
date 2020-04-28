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
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
  
}
// sending an object includes UserID;
async function getOrdersByUserID(id){

    try {
        var sql = ("SELECT * FROM orders WHERE UserID =?") 
        let parameters = [id];
        let userOrders = await connection.executeWithParameters(sql,parameters);
        console.log("Order From DB"+userOrders)
        return userOrders;

    } catch (e) {
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
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
    
}

async function getNumberAllOrders(){
    try{
        var sql = ("SELECT COUNT(OrderID) FROM orders")
        let numberOfOrders = await connection.execute(sql);
        console.log("Number of orders in Website :"+ numberOfOrders);
        return numberOfOrders;

    }catch(e){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
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
    getNumberAllOrders
}