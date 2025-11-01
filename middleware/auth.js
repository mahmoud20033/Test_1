const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    try {
        const fullToken = req.headers.authorization
        const token = fullToken?.split(" ")[1]
        if (!token) return res.status(400).send('Access denied')
        const decodedToken = jwt.verify(token, 'secret')
        req.user = decodedToken
        next()
    } catch (error) {
        res.status(400).send("Invalid Token")
    }
}