const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const app = express()

//init middleware
app.use(morgan("dev"))
// app.use(morgan("combined"))
app.use(helmet())
app.use(compression())
// init db

//init router
app.get('/',(req,res,next)=>{
    const strCompress = "Hello aaaaaaaaaaaaaaaaa"
    return res.status(500).json({
        message:"welcome",
        metaData: strCompress.repeat(10000)
    })
})

module.exports = app