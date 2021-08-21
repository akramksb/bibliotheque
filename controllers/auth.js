const jwt = require('jsonwebtoken');
require('dotenv').config()

function authenticateToken(req, res, next)
{
    const token = req.cookies.jwt;
    if (!token) return res.sendStatus(401);
    jwt.verify( token, process.env.JWT_SECRET_TOKEN, (err, user)=> {
        if (err) return res.sendStatus(401);
        console.log(user);
        next()
    })
}

module.exports = {
    authenticateToken
}