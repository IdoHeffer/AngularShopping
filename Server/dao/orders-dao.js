let connection = require("./connection")

async function getOrder(id) {
    var sql = ("SELECT * FROM orders WHERE OrderID =?") 
    let parameters = [id];
    let order = connection.executeWithParameters(sql,parameters);
    console.log("Order From DB"+order)
    return order;
}
// sending an object includes UserID;
async function getOrdersByUserID(id){
    var sql = ("SELECT * FROM orders WHERE UserID =?") 
    let parameters = [id];
    let userOrders = await connection.executeWithParameters(sql,parameters);
    console.log("Order From DB"+userOrders)
    return userOrders;
}

async function addOrder(order) {
   var sql = ("INSERT INTO marketproject.orders (UserID,CartID,FinalPrice,DeliveryCityAddress,DeliveryStreetAddress,DeliveryDate,CreditCardDigits) VALUES (?,?,?,?,?,?,?)")
   let parameters = [order.UserID,order.CartID,order.FinalPrice, order.DeliveryCityAddress,order.DeliveryStreetAddress,order.DeliveryDate,order.CreditCardDigits]
   let addeOrder = await connection.executeWithParameters(sql,parameters);
   console.log("Order Created in the DB :"+addeOrder);
   return addeOrder;
}

async function updateOrder(order) {
    var sql = ("UPDATE `marketproject`.`orders` SET UserID=? ,CartID=?,FinalPrice=?,DeliveryCityAddress=?,DeliveryStreetAddress=?,DeliveryDate=?, LastFourCreditCardDigits=? WHERE OrderID = ?");
    let parameters = [order.UserID,order.CartID,order.FinalPrice, order.DeliveryCityAddress,order.DeliveryStreetAddress,order.DeliveryDate,order.CreditCardDigits,order.OrderID]
    let updatedOrder = await connection.executeWithParameters(sql,parameters);
    console.log("Order Updated in the DB :"+updatedOrder)
    return updatedOrder;
}
async function deleteOrder(id) {
    var sql = ("DELETE FROM orders WHERE OrderID =?");
    let parameters = [id] 
    await connection.executeWithParameters(sql,parameters);
    console.log("Order Deleted FROM DB");
}

async function getAllOrders() {
    var sql = ("SELECT * FROM orders") 
   let orders = await connection.execute(sql);
    console.log("All Orders:"+orders);
    return orders;
}

async function getNumberAllOrders(){
    var sql = ("SELECT COUNT(OrderID) FROM orders")
    let numberOfOrders = await connection.execute(sql);
    console.log("Number of orders in Website :"+ numberOfOrders);
    return numberOfOrders;

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