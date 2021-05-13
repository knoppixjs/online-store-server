const config = require("config")
const jwt = require('jsonwebtoken')

class JwtApi {
    static _key = config.get("secretKey")

    static encode = (id) => {
        return jwt.sign(
            {id},
            this._key,
            {expiresIn: '24h'}
        )
    }

    static decode = (token) => {
        return jwt.decode(token)
    }
}

module.exports = JwtApi