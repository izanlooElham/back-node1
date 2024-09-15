const {StatusCodes:HttpStatus}=require("http-status-codes")
const { getOTPSchema, checkOTPSchema } = require("../../../validators/user/auth.schema")
const createError=require("http-errors")
const { RandomNumberGenerator, SignAccessToken, SignRefreshToken } = require("../../../../utils/functions")
const { UserModel } = require("../../../../models/user")
const Controller = require("../../controller")
const { VerifyRefreshToken } = require("../../../../utils/functions")
const { ROLES } = require("../../../../utils/constanse")
const { KavenegarApi } = require("kavenegar")

class UserAuthController extends Controller{
        async getOTP(req, res, next){
            try {
                const api=KavenegarApi({apikey:"527A74772F6A78626E6E6B4E574B54734638385432345639426C4C4237472B376F4E5072705279507558633D"})
                await getOTPSchema.validateAsync(req.body)
                const {mobile}=req.body
                const code=RandomNumberGenerator()
                // api.VerifyLookup({
                //     receptor:mobile,
                //     token: code,
                //     template:"OTP"
                //     },async(res, status)=>{
                //         if(status == 200){
                //         }else{                         
                //         }
                //     })
                const result=await this.saveUser(mobile,code)
                if(!result) throw createError.Unauthorized("ورود شما با موفقیت انجام نشد")
                return res.status(HttpStatus.OK).send({
                    statusCode:HttpStatus.OK,
                    data:{
                        message:"کد اعتبار سنجی با موفقیت برای شما ارسال شد",
                        code,
                        mobile
                    }
                })
            } catch (error) {
                next(error)
            }
        }
        async checkOTP(req, res, next){
            try {
                await checkOTPSchema.validateAsync(req.body)
                const {mobile, code}=req.body
                const user=await UserModel.findOne({mobile})
                if(!user) throw createError.NotFound("کاربر مورد نظر وجود ندارد")
                if(user?.otp?.code != code) throw createError.Unauthorized("کد وارد شده صحیح نمیباشد")
                const now=Date.now()
                if(+user?.otp?.expiresIn < now) throw createError.Unauthorized("کد شما منقضی شده است")
                const accessToken=await SignAccessToken(user._id)
                const refreshToken=await SignRefreshToken(user._id)
                return res.status(HttpStatus.OK).json({
                    data:{
                        accessToken,
                        refreshToken
                    }
                })
                    
                
            } catch (error) {
                next(error)
            }
        }
        async refreshToken(req, res, next){
            try {
                const {refreshToken}=req.body
                const mobile =await VerifyRefreshToken(refreshToken)
                const user=await UserModel.findOne({mobile})
                const accessToken=await SignAccessToken(user._id)
                const newRefreshToken=await SignRefreshToken(user._id)
                return res.status(HttpStatus.OK).json({
                    data:{
                        accessToken,
                        refreshToken: newRefreshToken
                    }
                })
            } catch (error) {
                next(error)
            }
        }
        async saveUser(mobile,code){
           let otp={
                code,
                expiresIn: (new Date().getTime() + 120000)
                }
            const result=await this.checkExistUser(mobile)
            if(result){
                return await (this.updateUser(mobile, {otp}))
            }
            return !!(await UserModel.create({
                mobile,
                otp,
                Role: ROLES.USER
            }))
        }
        async updateUser(mobile, objectData={}){
            Object.keys(objectData).forEach(key=>{
                if([""," ", null,undefined, 0, NaN,"0"].includes(objectData[key])) delete objectData[key]
            })
            const updateResult=await UserModel.updateOne({mobile}, {$set: objectData})
            return !!updateResult.modifiedCount

        }
        async checkExistUser(mobile){
            const user=await UserModel.findOne({mobile})
            return !!user
        }
}

module.exports={
    UserAuthController : new UserAuthController()
}