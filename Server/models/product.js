const Joi = require("joi");

class Product {
    constructor(ProductName, Price, CategoryID, picture,img,lastChangeDate) {
        this.ProductName = ProductName
        this.Price = Price
        this.CategoryID = CategoryID
        this.picture = picture
        this.lastChangeDate = lastChangeDate
        this.img =img

    }

    static validate(productToValidate) {

        const validationSchema = {
            ProductName: Joi.string().required(),
            Price: Joi.number().required(),
            CategoryID: Joi.number().required(),
            picture: Joi.string().optional(),
            img: Joi.string().optional(),
            ProductID: Joi.number().optional(),
            lastChangeDate: Joi.date().optional()
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
