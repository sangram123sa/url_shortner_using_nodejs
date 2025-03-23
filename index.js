const express = require('express');
const {connectToMongoDB} = require('./connect')
const urlRoute = require('./routes/url')
const path = require("path")
const staticRouter = require("./routes/staticRouter")
const URL = require('./models/url')
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

app.use("/url", urlRoute)
app.use("/", staticRouter)

// app.get("/test", async(req, res)=>{
//     const allUrls = await URL.find({});

//     return res.render("home", {
//         urls:allUrls
//     })
//     // return res.end(
//     //     `<html>
//     //         <body>
//     //             <ul>
//     //                 ${allUrls.map(e=>{return `<li>${e.shortId}-${e.redirectURL}-${e.visitHistory.length}</li>`}).join("")}
//     //             </ul>
//     //         </body>
//     //     </html>`
//     // )
// })


app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`))