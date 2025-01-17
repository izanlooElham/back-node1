const JWT=require("jsonwebtoken")
const createError=require("http-errors")
const { UserModel } = require("../../models/user")
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constanse")

async function getToken(headers){
    const [bearer, token]=headers?.authorization?.split(" ") || []
    if(token &&  ["bearer","Bearer"].includes(bearer) ) {
        return token
    }else{
        throw createError.Unauthorized("حساب کاربری شناسایی نشد")
    }
}
async function VerifyAccessToken(req, res, next){
    try {
        const token=await getToken(req.headers)
        JWT.verify(token, ACCESS_TOKEN_SECRET_KEY,async(err, payload)=>{
          try {
            if(err) throw createError.Unauthorized("وارد حساب کاربری خود شوید")
                const {mobile}=payload || {}
                const user=await UserModel.findOne({mobile}, {password:0, otp:0})
                if(!user) throw createError.Unauthorized("حساب کاربری یافت نشد")
                req.user=user
                return next()
          } catch (error) {
            next(error)
          }
        })
    } catch (error) {
        next(error)
    }
}

async function VerifyAccessTokenInGraphQL(req){
    try {
        const token=await getToken(req.headers)
        const {mobile}=JWT.verify(token, ACCESS_TOKEN_SECRET_KEY)
        const user=await UserModel.findOne({mobile}, {password:0, otp:0})
        if(!user) throw createError.Unauthorized("حساب کاربری یافت نشد")  
        return user  
    } catch (error) {
        throw new createError.Unauthorized()
    }
}

module.exports={
    VerifyAccessToken,
    VerifyAccessTokenInGraphQL
}