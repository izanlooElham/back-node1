const { PermissionsModel } = require("../../../../models/permissions");
const Controller = require("../../controller"); 
const {StatusCodes:HttpStatus}=require("http-status-codes");
const createError=require("http-errors");
const { addPermissionSchema } = require("../../../validators/admin/RBAC.schema");
const { copyObject, deleteInvalidPropertyInObject } = require("../../../../utils/functions");




class PermissionController extends Controller{
    async getAllPermissions(req, res, next){
            try {
                const permissions=await PermissionsModel.find({})
                return res.status(HttpStatus.OK).json({
                    statusCode:HttpStatus.OK,
                    data:{
                        permissions
                    }
                })
            } catch (error) {
                next(error)
            }
    } 
    async createNewPermission(req, res, next){
        try {
            const {name, description}=await addPermissionSchema.validateAsync(req.body)
            await this.findPermissionWithTitle(name)
            const permission=await PermissionsModel.create({name,description})
            if(!permission) throw createError.InternalServerError("دسترسی ایجاد نشد") 
            return res.status(HttpStatus.CREATED).json({
                statusCode:HttpStatus.CREATED,
                data:{
                    message: "دسترسی با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    } 
    async removePermission(req, res, next){
        try {
            const {id}=req.params
            await this.findPermissionWithId(id)
            const removedPermission=await PermissionsModel.deleteOne({_id: id})
            if(!removedPermission.deletedCount) throw createError.InternalServerError("دسترسی حذف نشد")
            return res.status(HttpStatus.OK).json({
                statusCode:HttpStatus.OK,
                data:{
                    message: "با موفقیت حذف شد"
                }
        })
        } catch (error) {
            next(error)
        }
    }
    async updatePermissionById(req, res, next){
        try {
            const {id}=req.params
            await this.findPermissionWithId(id)
            const data=copyObject(req.body)
            deleteInvalidPropertyInObject(data,[])
            const updatePermissionResult=await PermissionsModel.updateOne({_id: id},{
                $set: data
            })
            if(!updatePermissionResult.modifiedCount) throw createError.InternalServerError("ویرایش دسترسی انجام نشد")
            return res.status(HttpStatus.OK).json({
                    statusCode: HttpStatus.OK,
                    data:{
                        message:"ویرایش دسترسی با موفقیت انجام شد"
                    }
        })
        } catch (error) {
            next(error)
        }
    }
    async findPermissionWithTitle(name){
        const permission=await PermissionsModel.findOne({name})
        if(permission) throw createError.BadRequest("دسترسی مورد نظر قبلا ثبت شده ")

    }
    async findPermissionWithId(_id){
        const permission=await PermissionsModel.findOne({_id})
        if(!permission) throw createError.NotFound("دسترسی یافت نشد ")
        return permission

    }

}






module.exports={
    PermissionController: new PermissionController()
}