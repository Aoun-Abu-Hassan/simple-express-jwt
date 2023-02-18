const config = require('../config.json')
const jwt = require('jsonwebtoken')

const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.get('Authorization')
        if (!authHeader) {
            const error = new Error('Unauthorized')
            error.statusCode = 401
            throw error
        }
        const token = authHeader.split(' ')[1]
        let decodedToken
        try {
            decodedToken = jwt.verify(token, config.secretKey)
        } catch (err) {
            err.statusCode = 401
            return next(err)
        }
        if (!decodedToken) {
            const error = new Error('Unauthorized')
            error.statusCode = 401
            throw error
        }
        req.user = decodedToken
        next()
    } catch (e) {
        if (!e.statusCode) {
            e.statusCode = 500;
        }
        next(e)
    }
}

module.exports = { isAuth }
