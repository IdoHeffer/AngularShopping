const Joi = require("joi");

class CartItem {
    constructor(ProductID, Amount, TotalItemPrice, CartID) {
        this.ProductID = ProductID
        this.Amount = Amount
        this.TotalItemPrice = TotalItemPrice
        this.CartID = CartID
    }

    static validate(cartItemToValidate) {

        const validationSchema = {
            ProductID: Joi.number().required(),
            Amount: Joi.number().required(),
            TotalItemPrice: Joi.number(),
            CartID: Joi.number().required(),
            CartItemID:Joi.number().optional()
        };

        const error = Joi.validate(
            cartItemToValidate, validationSchema, { abortEarly: false }).error;



        if (error) { // אם היתה שגיאה אחת או יותר
            // החזרת הודעות השגיאה בלבד
            return error.details.map(err => err.message);
        }

        // אם לא היתה שגיאה
        return null;
    }
}

module.exports = CartItem;
