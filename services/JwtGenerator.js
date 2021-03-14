const config = require("config")
const jwt = require('jsonwebtoken')

class JwtGenerator {
   static generate = (id, email) => {
        return jwt.sign(
            {id, email},
            config.get("secretKey"),
            {expiresIn: '24h'}
        )
    }
}

module.exports = JwtGenerator