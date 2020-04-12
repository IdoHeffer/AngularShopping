const Joi = require("joi");


class User {
    constructor(UserName, password) {
        this.UserName = UserName
        this.password = password
        this.FirstName - FirstName
        this.LastName = LastName
    }

    static validate(userToValidate) {

        const validationSchema = {
            UserName: Joi.string().email().required(),
            password: Joi.string().required(),
            FirstName: Joi.string().required(),
            LastName: Joi.string().required(),
            UserID: Joi.number().optional(),
            City: Joi.string().optional(),
            Street: Joi.string().optional()
            // regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
        };

        const error = Joi.validate(
            userToValidate, validationSchema, { abortEarly: false }).error;



        if (error) { // אם היתה שגיאה אחת או יותר
            // החזרת הודעות השגיאה בלבד
            console.log("Error"+error);
            return error.details.map(err => err.message);
        }

        // אם לא היתה שגיאה
        console.log("User Is Valid")
        return null;
    }
}

module.exports = User;