'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const KeyTokenService = require("./keyToken.service")
const {getInfoData} = require("../utils/index")
const {
  createTokenPair
} = require("../auth/authUtils")
const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
}

class AccessService {

  static signUp = async ({
    name,
    email,
    password
  }) => {
    try {
      //check email exist
      const holderShop = await shopModel.findOne({
        email
      }).lean()

      if (holderShop) {
        return {
          code: '123123',
          message: "Shop already registered!!"
        }
      }
      const passwordHash = await bcrypt.hash(password, 10)
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP]
      })

      if (newShop) {
        //create private, public key
        // const {
        //   privateKey,
        //   publicKey
        // } = crypto.generateKeyPairSync('rsa', {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: "pkcs1",
        //     format: 'pem'
        //   },
        //   privateKeyEncoding: {
        //     type: "pkcs1",
        //     format: 'pem'
        //   }
        // })


        const privateKey = crypto.randomBytes(64).toString("hex")
        const publicKey = crypto.randomBytes(64).toString("hex")


        console.log("privateKey,publicKey", privateKey, publicKey)
        console.log("ss", newShop);
        // const publicKeyString = await KeyTokenService.createKeyToken({
        //   userId: newShop._id,
        //   publicKey,
        //   privateKey
        // })
        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey
        })

        if (!keyStore) {
          return {
            code: "xx",
            message: "publickey error"
          }
        }

        // const publicKeyObject = crypto.createPublicKey(publicKeyString)

        //create token pair
        const token = await createTokenPair({
          userId: newShop._id,
          email
        }, publicKey, privateKey)

        console.log(`tokennn`, token)

        return {
          code: 201,
          metaData: {
            shop: getInfoData(['_id', 'name', 'email'], newShop),
            token
          }
        }
      }


      return {
        code: 200,
        metaData: null
      }

    } catch (error) {
      return {
        code: '500',
        message: error.message,
        status: 'error'
      }
    }
  }
}

module.exports = AccessService