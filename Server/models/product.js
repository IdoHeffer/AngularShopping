const Joi = require("joi");

class Product {
    constructor(ProductName, Price, CategoryID, img) {
        this.ProductName = ProductName
        this.Price = Price
        this.CategoryID = CategoryID
        this.img = img

    }

    static validate(productToValidate) {

        const validationSchema = {
            ProductName: Joi.string().required(),
            Price: Joi.number().required(),
            CategoryID: Joi.number().required(),
            img: Joi.string().optional(),
            ProductID: Joi.number().optional()

        };

        const error = Joi.validate(
            productToValidate, validationSchema, { abortEarly: false }).error;



        if (error) { // אם היתה שגיאה אחת או יותר
            // החזרת הודעות השגיאה בלבד
            return error.details.map(err => err.message);
        }

        // אם לא היתה שגיאה
        return null;
    }
}

module.exports = Product;
