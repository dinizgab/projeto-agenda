exports.checkCSRFError = (err, req, res, next) => {
    if(err && err.code === 'EBADCSRFTOKEN') {
        return res.send('erro')
    }
}

exports.CSRFMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}