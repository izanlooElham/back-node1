const { default: mongoose } = require("mongoose");
const { CategoryModel } = require("../../../../models/categories");
const { addCategorySchema, updateCategorySchema } = require("../../../validators/admin/category.schema");
const Controller = require("../../controller");
const createError =require("http-errors")
const {StatusCodes:HttpStatus}=require("http-status-codes")
const path= require("path")

class CategoryController extends Controller{
    async addCategory(req, res, next){
        try {
            await addCategorySchema.validateAsync(req.body)
            const {title, parent}=req.body
            const category=await CategoryModel.create({title, parent})
            if(!category) throw createError.InternalServerError("خطای داخلی")
            return res.status(HttpStatus.CREATED).json({
                status: HttpStatus.CREATED,
                data:{
                    message: "دسته بندی با موفقیت افزوده شد"
                }
            })
        } catch (error) {
            next(error)
        }

    }
    async removeCategory(req, res, next){
        try {
            const {id}=req.params
            const category=await this.checkExistById(id)
            const deleteCategory=await CategoryModel.deleteMany({
                $or:[
                {_id:category._id},
                {parent:category._id}
                ]
            })
            if(deleteCategory.deletedCount === 0) throw createError.InternalServerError("حذف دسته بندی انجام نشد")
            return res.status(HttpStatus.OK).json({
                statusCode:HttpStatus.OK,
                data:{
                    message: "حذف دسته بندی با موفقیت انجام شد"
                }
        })
        } catch (error) {
            next(error)
        }

    }
    async editCategory(req, res, next){
        try {
            const {id}=req.params
            const {title}=req.body
            const category=await this.checkExistById(id)
            await updateCategorySchema.validateAsync(req.body)
            const updatedResult=await CategoryModel.updateOne({_id: id},{$set: {title}})
            if(updatedResult.modifiedCount ==0) throw createError.InternalServerError("به روز رسانی انجام نشد")
            return res.status(HttpStatus.OK).json({
                    statsuCode:HttpStatus.OK,
                    data:{
                        message:"به روز رسانی با موفقیت انجام شد"
                    }
        })
        } catch (error) {
            next(error)
        }

    }
    async getAllCategory(req, res, next){
        try {
            // const category=await CategoryModel.aggregate([
            //     {
            //         $lookup:{
            //             from: "categories",
            //             localField:"_id",
            //             foreignField:"parent",
            //             as:"children"
            //         }
            //     },
            //     {
            //         $project:{
            //             __v:0,
            //             "children.__v":0,
            //             "cildren.parent":0
            //         }
            //     }
            // ])
            const categories=await CategoryModel.find({parent : undefined})
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data:{
                    categories
                }
            })
        } catch (error) {
            next(error)
        }

    }
    async getCategoryById(req, res, next){
        try {
            const {id: _id}=req.params
            const category=await CategoryModel.aggregate([
                {
                    $match:{
                        _id :new mongoose.Types.ObjectId(_id)
                    }
                },
                {
                    $lookup:{
                        from:"categories",
                        localField:"_id",
                        foreignField:"parent",
                        as:"children"
                    }
                },
                {
                    $project:{
                        __v:0,
                        "children.__v":0,
                        "cildren.parent":0
                    }
                }
            ])
            return res.status(HttpStatus.OK).json({
                statusCode:HttpStatus.OK,
                data:{
                    category
                }
            })
        } catch (error) {
            next(error)
        }

    }
    async getAllParents(req, res, next){
        try {
            const parents=await CategoryModel.find({parent: undefined},{__v:0})
            return res.status(HttpStatus.OK).json({
                    statusCode: HttpStatus.OK,
                    data:{
                        parents
                    }
            })
        } catch (error) {
            next(error)
        }

    }
    async getChildOfParents(req, res, next){
        try {
            const{parent}=req.params
            const children=await CategoryModel.find({parent},{__v:0})
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data:{
                    children
                }
            })
        } catch (error) {
            next(error)
        }

    }
    async getAllCategoryWithoutPopulate(req, res, next){
        try {
            const categories=await CategoryModel.aggregate([
                {$match:{}}
            ])
            return res.status(HttpStatus.OK).json({
                statusCode:HttpStatus.OK,
                data:{
                    categories
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async addImage(req, res, next){
        try {
                const {id}=req.params
                const categoryDataBody =await addCategorySchema.validateAsync(req.body)
                req.body.image= path.join(categoryDataBody.fileUploadPath,categoryDataBody.filename)
                req.body.image= req.body.image.replace(/\\/g,"/")
                const image= req.body.image
                const category=await CategoryModel.updateOne({_id: id}, {$set:{image}}) 
                return res.status(HttpStatus.OK).json({
                    statusCode: HttpStatus.OK,
                    data:{
                        message:"عکس با موفقیت ذخیره شد"
                    }
                })
        } catch (error) {
            next(error)
        }
    }
    async checkExistById(id){
        const categroy= await CategoryModel.findById(id)
        if(!categroy) throw createError.NotFound("دسته بندی مورد نظر یافت نشد")
        return categroy
    }
}

module.exports={
    AdminCategoryController: new CategoryController()
}