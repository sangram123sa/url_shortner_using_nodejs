const User = require("../models/user")
const {v4: uuidv4} = require('uuid');
const {setUser, getUser} = require('../service/auth');


async function handleUserSignup(req, res) {
    const {name, email, password} = req.body
    await User.create({
        name,
        email,
        password
    })
    return res.redirect("/")
}

async function handleUserLogin(req, res){
    const {email, password} = req.body
    const user = await User.findOne({
        email,password
    })
    console.log(user)
    if(!user){
        return res.render("login", {error: "Invalid Username or Password"})
    }
    // we don't need session-id now we push the data in jwt
    // const sessionId = uuidv4()
    // setUser(sessionId, user)
    const token = setUser(user)

    res.cookie("token", token,{
        httpOnly:true,
        secure:false, //if https using then make it false
        sameSite:"strict"
    })
    return res.redirect("/")
    // return res.json({token})
}


module.exports = {handleUserSignup, handleUserLogin}