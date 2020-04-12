const Joi = require("joi");

class Product {
    constructor(ProductName, Price, CategoryID, Image) {
        this.ProductName = ProductName
        this.Price = Price
        this.CategoryID = CategoryID
        this.Image = Image

    }

    static validate(productToValidate) {

        const validationSchema = {
            ProductName: Joi.string().required(),
            Price: Joi.number().required(),
            CategoryID: Joi.number().required(),
            Image: Joi.string().optional(),
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
