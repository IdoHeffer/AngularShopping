function validateResponse(object) {
    if (object.length == 0) {
        throw new ServerError(ErrorType.INVALID_DATA, e)
    }
}

function validateId(id) {
    if (id == 0) {
        throw new ServerError(ErrorType.INVALID_DATA, e)
    }
}


module.exports = {
    validateResponse,
    validateId
}
