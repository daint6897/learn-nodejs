'use strict'

const dev = {
    app: {
        port: process.env.PORT_DEV || 3055
    },
    db: {
        host: process.env.DB_HOST_DEV || "localhost",
        port: process.env.DB_PORT_DEV || 2718,
        name: process.env.DB_NAME_DEV || 'dbDev'
    }
}
const pro = {
    app: {
        port: 3000
    },
    db: {
        host: "localhost",
        port: 27017,
        name: 'dbDev'
    }
}

const config = {
    dev,
    pro
}
const env = process.env.NODE_ENV || 'dev'
module.exports = config[env]