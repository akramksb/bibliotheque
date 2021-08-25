const jwt = require('jsonwebtoken');
const path = require('path');

require('dotenv').config()

function authenticateToken(req, res, next)
{
    const token = req.cookies.jwt;
    if (!token) return res.json({});
    jwt.verify( token, process.env.JWT_SECRET_TOKEN, (err, user)=> {
        if (err) return res.json({});
        req.user = user;
        next()
    })
}


function requireAuth(req, res, next)
{
    const token = req.cookies.jwt;
    if (!token) return res.redirect("/login")
    jwt.verify( token, process.env.JWT_SECRET_TOKEN, (err, user)=> {
        if (err) return res.redirect("/login");
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

function sendFile(res, pageName)
{
    return res.sendFile( path.join( __dirname , `../public/${pageName}` ))
}

function logout(res)
{
    res.clearCookie("jwt");
    res.redirect('/login')
}

module.exports = {
    authenticateToken,
    isLoggedIn,
    requireAuth,
    sendFile,
    logout
}