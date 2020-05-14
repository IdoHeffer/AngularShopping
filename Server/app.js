const express = require("express");
const usersController = require ("./controllers/users-controller");
const productsController= require("./controllers/products-controller");
const adminsController= require("./controllers/admins-controller");
const ordersController= require("./controllers/orders-controller");
const categoriesController= require("./controllers/categories-controller");
const cartsController= require("./controllers/carts-controller");
const cartItemsController= require("./controllers/cartitems-controller");
const loginFilter = require('./middleware/login-filter');
const errorHandler = require("./errors/error-handler");
const server = express();
const fileUpload = require("express-fileupload");
server.use(express.json());


server.use(express.static('uploads'));
server.use(fileUpload());
// Middlewares init
server.use(loginFilter());



server.use("/Users", usersController);
server.use("/Products", productsController);
server.use("/Admin", adminsController);
server.use("/Orders", ordersController);
server.use("/Categories", categoriesController);
server.use("/Carts", cartsController);
server.use("/CartItems", cartItemsController);
server.use(errorHandler);


server.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
});


