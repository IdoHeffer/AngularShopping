const Joi = require("joi");

class Category {
    constructor(CategoryName) {
        this.CategoryName = CategoryName
    }

    static validate(categoryToValidate) {

        const validationSchema = {
            CategoryName: Joi.string().required(),
            CategoryID: Joi.number().optional()

        };

        const error = Joi.validate(
            categoryToValidate, validationSchema, { abortEarly: false }).error;



        if (error) { // אם היתה שגיאה אחת או יותר
            // החזרת הודעות השגיאה בלבד
            return error.details.map(err => err.message);
        }

        // אם לא היתה שגיאה
        return null;
    }
}

module.exports = Category;
