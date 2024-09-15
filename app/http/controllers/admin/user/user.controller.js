const { StatusCodes } = require("http-status-codes");
const { UserModel } = require("../../../../models/user");
const Controller = require("../../controller");
const {StatusCodes:HttpStatus}=require("http-status-codes")
const createError=require("http-errors");
const { deleteInvalidPropertyInObject } = require("../../../../utils/functions");

class UserController extends Controller{
        async getAlluser(req, res, next){
            try {
                const {search}=req.query
                const databaseQuery={}
                if(search) databaseQuery['$text']={$search: search}
                const users=await UserModel.find(databaseQuery)
                return res.status(HttpStatus.OK).json({
                    statusCode:HttpStatus.OK,
                    data:{
                        users
                    }
                })
            } catch (error) {
                next(error)
            }
        }
        async updateUserProfile(req, res, next){
            try {
              const userId=req.user._id
              const data=req.body
              const BlackListFields=["mobile", "otp","bills", "discount", "Roles"]
              deleteInvalidPropertyInObject(data,BlackListFields)
              const profileUpdated=await UserModel.updateOne({_id: userId},{$set:data})
              if(!profileUpdated.modifiedCount) throw createError.InternalServerError("به روز رسانی انجام نشد")
                return res.status(HttpStatus.OK).json({
                        statusCode:HttpStatus.OK,
                        data:{
                            message:"به روز رسانی انجام شد"
                        }
            })
            } catch (error) {
                next(error)
            }
        }
        async userProfile(req, res, next){
            try {
              const user=req.user
                return res.status(HttpStatus.OK).json({
                        statusCode:HttpStatus.OK,
                        data:{
                            user
                        }
            })
            } catch (error) {
                next(error)
            }
        }
}

module.exports={
    AdminUserController: new UserController()
}