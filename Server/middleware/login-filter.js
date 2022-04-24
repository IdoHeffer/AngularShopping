const expressJwt = require('express-jwt');
const config = require('../config.json');

// Extracting the text from the secret's JSON
let { secret } = config;
//console.log(secret);

function authenticateJwtRequestToken() {
    // Load secret into 
    // IN the future please add algorithms to the params near @secret at expressJwt Function.
    // {@link https://github.com/auth0/express-jwt/blob/5fb8c88067b9448d746d04ab60ad3b1996c7e310/README.md#required-parameters}
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            '/Users/login',
            '/Users/register',
            '/Users/changePassword',
            '/orders/recipt/download'
        ]
    });
}

module.exports = authenticateJwtRequestToken;