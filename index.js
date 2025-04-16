const express = require('express');
const {connectToMongoDB} = require('./connect')
const urlRoute = require('./routes/url')
const path = require("path")
const cookieParser = require('cookie-parser');
const staticRouter = require("./routes/staticRouter")
const userRoute = require('./routes/user')
const URL = require('./models/url')
const {checkForAuthentication, restrictTo} = require('./middleware/auth')
const app = express()

const PORT = 8001

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>console.log('MongoDB is connected'))
.catch(()=>console.log('Something error is coming in connectivity'))

// set up for the ejs
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthentication)
// add all routes
app.use("/url",restrictTo(["NORMAL", "ADMIN"]), urlRoute)
app.use("/", staticRouter)
app.use("/user", userRoute)




app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`))