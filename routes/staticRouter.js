const express = require('express');
const URL = require("../models/url");
const { restrictTo } = require('../middleware/auth');

const router = express.Router()

// router.get('/makeurl', (req, res)=>{
//     res.render("home")
// })

router.get('/', restrictTo(["NORMAL","ADMIN"]), async(req, res)=>{
    const allUrls = await URL.find({createdBy:req.user._id})
    return res.render("home", {
        urls: allUrls
    }) 
})

router.get("/admin/urls", restrictTo(["ADMIN"]), async(req, res)=>{
    const allUrls = await URL.find({})
    return res.render("home", {
        urls: allUrls
    }) 
})

router.get("/signup", (req, res) =>{
    return res.render("signup")
})

router.get("/login", (req,res)=>{
    res.render("Login")
})


module.exports = router