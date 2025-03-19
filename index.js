const express = require('express');
const {connectToMongoDB} = require('./connect')
const urlRoute = require('./routes/url')

const app = express()
const PORT = 8001

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>console.log('MongoDB is connected'))
.catch(()=>console.log('Something error is coming in connectivity'))

app.use(express.json())

app.use("/url", urlRoute)



app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`))