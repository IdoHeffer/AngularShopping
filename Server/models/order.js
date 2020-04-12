const Joi = require("joi");

class Order {
    constructor(UserID, CartID, FinalPrice, DeliveryCityAddress, DeliveryStreetAddress, DeliveryDate, OrderDate, LastFourCreditCardDigits) {
        this.UserID = UserID;
        this.CartID = CartID;
        this.FinalPrice = FinalPrice;
        this.DeliveryCityAddress = DeliveryCityAddress;
        this.DeliveryStreetAddress = DeliveryStreetAddress;
        this.DeliveryDate = DeliveryDate;
        this.OrderDate = OrderDate;
        this.LastFourCreditCardDigits = LastFourCreditCardDigits;
    }

    static validate(orderToValidate) {

        const validationSchema = {
            UserID: Joi.number().required(),
            CartID: Joi.number().required(),
            FinalPrice: Joi.number().required(),
            DeliveryCityAddress: Joi.string().required(),
            DeliveryStreetAddress: Joi.string().required(),
            DeliveryDate: Joi.date(),
            // OrderDate: Joi.date().optional(),
            LastFourCreditCardDigits: Joi.string().max(4).min(4).required(),
            OrderID: Joi.number().optional()

        };

        const error = Joi.validate(
            orderToValidate, validationSchema, { abortEarly: false }).error;



        if (error) { // אם היתה שגיאה אחת או יותר
            // החזרת הודעות השגיאה בלבד
            return error.details.map(err => err.message);
        }

        // אם לא היתה שגיאה
        return null;
    }
}

module.exports = Order;
