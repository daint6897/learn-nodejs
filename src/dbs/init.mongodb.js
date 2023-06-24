'use strict'

const {db} = require('../configs/config.mongdb')
// console.log("dbdb",db);
const mongoose = require('mongoose')
const connectString = `mongodb://${db.host}:${db.port}/${db.name}`



class Database{
    constructor(){
        this.connect()
    }

    connect(){
        mongoose.connect(connectString).then( _ => console.log(`connected mongo`))
        .catch(err=> console.log("err connect"))

    }

    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database()
        }

        return Database.instance
    }
}


const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb