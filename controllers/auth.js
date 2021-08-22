const jwt = require('jsonwebtoken');
require('dotenv').config()

function authenticateToken(req, res, next)
{
    const token = req.cookies.jwt;
    if (!token) return res.sendStatus(401);
    jwt.verify( token, process.env.JWT_SECRET_TOKEN, (err, user)=> {
        if (err) return res.sendStatus(401);
        req.user = user;
        next()
    })
}

function isLoggedIn(req)
{
    const token = req.cookies.jwt;
    if (!token) return 0;
    jwt.verify( token, process.env.JWT_SECRET_TOKEN, (err, user)=> {
        if (err) return 0;
        req.user = user;
        return 1;
    })
    if (req.user)
        return 1;
}

module.exports = {
    authenticateToken,
    isLoggedIn
}