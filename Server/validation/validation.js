function validateResponse(object) {
    if (object.length == 0) {
        throw new Error("error");
    }
}

function validateId(id) {
    if (id == 0) {
        throw new Error("invalid id")
    }
}


module.exports = {
    validateResponse,
    validateId
}
