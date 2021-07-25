const  internalServerException = (req, res, exception) => {
     res.status(500).json({
        method: req.method,
        status: res.statusCode,
        error: {
            msg: exception.message || exception,
        }
    })
}

const  argumentException = (req, res, errors) => {
    res.status(400).json({
        method: req.method,
        status: res.statusCode,
        error: errors
    })
}

module.exports = {
    internalServerException,
    argumentException
};
