const config = require("config")
const jwt = require('jsonwebtoken')

class JwtGenerator {
   static key = config.get("secretKey")

   static generate = (id, email) => {
        return jwt.sign(
            {id, email},
            this.key,
            {expiresIn: '24h'}
        )
    }
}

module.exports = JwtGenerator