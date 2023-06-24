'use strict'

const HEADER = {
    APT_KEY : 'x-api-key',
    AUTHORIZATION: 'authorization'
}
const apiKey = async (req,res,next)=>{
    try {
        const key = req.headers[HEADER.APT_KEY]?.toString()
        if(!key){
            return res.status(403).json({
                message : "Forbidden Error"
            })
        }
    } catch (error) {

    }
}