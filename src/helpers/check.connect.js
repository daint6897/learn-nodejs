'use strict'
const os = require("os")
const mongoose = require('mongoose')

const _SECONDS = 500

const countConnect = () => {
    const numConnection = mongoose.connections.length

    console.log(`Number of connection ${numConnection}`);
}

const checkOverload = () => {
    // setInterval(() => {
    //     const numConnection = mongoose.connections.length
    //     const numCores = os.cpus().length
    //     const memoryUsage = process.memoryUsage().rss

    //     //example maximum number of connections based on number of cores
    //     const maxConnection = numCores * 5
    //     console.log(`Activate connections: ${numConnection}`);
    //     console.log(`memory usage :: ${memoryUsage/1024/1024} MB`)

    //     if (numConnection > maxConnection) {
    //         console.log("Connection overload detected :((")
    //     }
    // }, _SECONDS)
}

module.exports = {
    countConnect,
    checkOverload
}