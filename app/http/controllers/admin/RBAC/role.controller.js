const { RoleModel } = require("../../../../models/role");
const Controller = require("../../controller");
const {StatusCodes:HttpStatus}=require("http-status-codes");
const createError=require("http-errors");
const { addRoleSchema } = require("../../../validators/admin/RBAC.schema");
const mongoose = require("mongoose/lib/mongoose");
const { copyObject, deleteInvalidPropertyInObject } = require("../../../../utils/functions");

class RoleController extends Controller{
        async getAllRoles(req, res, next){
            try {
                const roles=await RoleModel.find({})
                return res.status(HttpStatus.OK).json({
                    StatusCode:HttpStatus.OK,
                    data:{
                        roles
                    }
                })
            } catch (error) {
                next(error)
            }
        }
        async CreateNewRole(req, res, next){
            try {
                const {title,permissions}=await addRoleSchema.validateAsync(req.body)
                await this.findRoleWithTitle(title)
                const role=await RoleModel.create({title,permissions})
                if(!role) throw createError.InternalServerError("نقش ایجاد نشد")
                return res.status(HttpStatus.CREATED).json({
                    StatusCode:HttpStatus.CREATED,
                    data:{
                        message: "نقش با موفقیت ایجاد شد"
                    }
                })
            } catch (error) {
                next(error)
            }
        }
        async removeRole(req, res, next){
            try {
                const {field}=req.params
                const role= await this.findRoleWithIdOrTitle(field)
                const removeRoleResult=await RoleModel.deleteOne({_id: role._id})
                if(!removeRoleResult.deletedCount) throw createError.InternalServerError("حذف نقش انجام نشد")
                return res.status(HttpStatus.OK).json({
                        statusCode: HttpStatus.OK,
                        data:{
                            message:"حذف نقش با موفقیت انجام شد"
                        }
            })
            } catch (error) {
                next(error)
            }
        }
        async updateRoleById(req, res, next){
            try {
                const {id}=req.params
                const role= await this.findRoleWithIdOrTitle(id)
                const data=copyObject(req.body)
                deleteInvalidPropertyInObject(data,[])
                const updateRoleResult=await RoleModel.updateOne({_id: role._id},{
                    $set: data
                })
                if(!updateRoleResult.modifiedCount) throw createError.InternalServerError("ویرایش نقش انجام نشد")
                return res.status(HttpStatus.OK).json({
                        statusCode: HttpStatus.OK,
                        data:{
                            message:"ویرایش نقش با موفقیت انجام شد"
                        }
            })
            } catch (error) {
                next(error)
            }
        }
        async findRoleWithTitle(title){
            const role=await RoleModel.findOne({title})
            if(role) throw createError.BadRequest("نقش مورد نظر قبلا ثبت شده ")

        }
        async findRoleWithIdOrTitle(field){
            let findQuery= mongoose.isValidObjectId(field)? {_id:field} : {title: field}
            const role=await RoleModel.findOne(findQuery)
            if(!role) throw createError.NotFound("نقش مورد نظر یافت نشد")
            return role
        }

}

module.exports={
    RoleController: new RoleController()
}
