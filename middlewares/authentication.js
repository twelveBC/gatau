const jwt = require('jsonwebtoken')
require('dotenv').config()

function getToken(id, username, role) {
    const token = jwt.sign({ 
        id,
        username,
        role
    }, process.env.SecretKey);
    return token
}

function authenticacaToken(params) {
    var decoded = jwt.verify(params, process.env.SecretKey);
    return decoded
}

module.exports = { getToken, authenticacaToken }