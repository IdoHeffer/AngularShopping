let errorHandler = (e, request, response, next) => {
    // e = my Server error --> IT HAS AN ENUM INSIDE (!!) called errorType
    if (e.errorType.isShowStackTrace && e.errorType.isShowStackTrace != null){
        console.error(e);
    }

    response.status(e.errorType.httpCode).json({error: e.errorType.message});
}

module.exports = errorHandler;