const { getUser } = require("../service/auth")

function checkForAuthentication(req, res, next){
    const tokenCookie = req.cookies?.token
    if (!tokenCookie) {
        return next()
    }
    const user = getUser(tokenCookie)
    req.user = user
    return next()

}

function restrictTo(roles=[]){
    return function (req, res, next){
        if (!req.user) {
            return res.redirect("/login")
        }
        if(!roles.includes(req.user.role)){
            return res.end("UnAuthorized")
        }
        return next()
    }
}

// Here in this two code we do same work. It's means it is a repeatative code. Let's refactor it.
// async function restrictToLoggedinUserOnly(req, res, next){
//     // console.log("check",req.body)
//     // console.log(req.headers.cookie)
//     const userUid =req.headers['Authorization'];
//     console.log(userUid)
//     if(!userUid){ return res.redirect('/login')}
//     const token = userUid.split(" ")[1]
//     console.log(token)
//     const user = getUser(token)
//     console.log(user)
//     if (!user){
//         return res.redirect('/login')
//     }
//     req.user = user
//     next()
// }

// // check authentication
// async function checkAuth(req, res, next){
//     // console.log(req.headers)
//     const userUid = req.headers["authorization"]
//     const token = userUid.split(" ")[1]
//     const user = getUser(token)
//     req.user = user
//     next()
// }



module.exports = {checkForAuthentication, restrictTo}
