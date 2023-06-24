'use strict'

const mongoose = require('mongoose')
const connectString = `mongodb://localhost:27017/learn_nodejs`

mongoose.connect(connectString).then( _ => console.log(`connected mongo`))
.catch(err=> console.log("err connect"))

module.exports = mongoose
