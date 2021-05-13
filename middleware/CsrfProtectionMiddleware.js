const csrf = require('csurf')

const csrfProtectionMiddleware = csrf({cookie: true})

module.exports = csrfProtectionMiddleware;