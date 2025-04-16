// const sessionIdToUserMap = new Map()
// here we replaced the map with jwt 
const jwt = require('jsonwebtoken');


const secretKey = "sangram#123"
function setUser(user){
    const payload = {
        _id: user._id,
        email:user.email,
        role: user.role
    }
    return jwt.sign(payload, secretKey)
} 

function getUser(token){
    // console.log(sessionIdToUserMap)
    // return sessionIdToUserMap.get(id)
    if(!token){
        return null
    }
    return jwt.verify(token, secretKey)
}

module.exports = {setUser, getUser}