const Joi = require("joi");

class Cart {
    constructor(UserID) {
        this.UserID = UserID;
        
    }

    static validate(cartToValidate) {

        const validationSchema = {
            UserID: Joi.number().required(),
        };

        const error = Joi.validate(
            cartToValidate, validationSchema, { abortEarly: false }).error;



        if (error) { // אם היתה שגיאה אחת או יותר
            // החזרת הודעות השגיאה בלבד
            return error.details.map(err => err.message);
        }

        // אם לא היתה שגיאה
        return null;
    }
}

module.exports = Cart;
