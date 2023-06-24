require('dotenv').config()
const compression = require('compression')
const express = require('express')
const {
    default: helmet
} = require('helmet')
const bodyParser = require("body-parser");
const morgan = require('morgan')
const app = express()
app.use(express.json({extended: true}))

// app.use(bodyParser);

//init middleware
// app.use(morgan("dev"))
// app.use(morgan("combined"))
// app.use(helmet())
// app.use(compression())


// init db

// require("./dbs/init.mongodb.lvl0")
require("./dbs/init.mongodb")

const {
    countConnect
} = require('./helpers/check.connect')
const {
    checkOverload
} = require('./helpers/check.connect')
countConnect()
checkOverload()
//init router
// app.get('/',(req,res,next)=>{
//     const strCompress = "Hello aaaaaaaaaaaaaaaaa"
//     return res.status(500).json({
//         message:"welcome",
//         metaData: strCompress.repeat(10000)
//     })
// })
app.use('/', require('./routers'))

// app.post('/a', (req, res) => {
//     const body = req.body;
//     console.log("body", body);
//     /*Body logic here*/
//     return res.status(200).json({
//         message: "welcom11e",
//         metaData: req.toString()
//     })
// })


module.exports = app