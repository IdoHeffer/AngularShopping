let ErrorType = {
    
    GENERAL_ERROR : {id: 1, httpCode: 600, message : "A big fuck up which we'll never tell you of had just happend. And now : A big fat lie....'A general error ....'", isShowStackTrace: true},
    USER_NAME_ALREADY_EXIST : {id: 2, httpCode: 601, message : "User name already exist", isShowStackTrace: false},
    UNAUTHORIZED : {id: 3, httpCode: 401, message : "Login failed, invalid user name or password", isShowStackTrace: false},
    NO_Data_PROVIDED : {id: 4, httpCode: 603, message : "The data was not provided correctly. Please Log-out And Login again"  },
    INVALID_DATA : {id: 5, httpCode: 604, message : "Invalid Data. Please try again", isShowStackTrace: true  }
}

module.exports = ErrorType;