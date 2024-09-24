const { BlogModel } = require("../../../../models/blog");
const { deleteFileInPublic } = require("../../../../utils/functions");
const { createBlogSchema } = require("../../../validators/admin/blog.schema");
const Controller = require("../../controller");
const path=require("path")
const {StatusCodes:HttpStatus}=require("http-status-codes")
const createError=require("http-errors");

class BlogController extends Controller{
    async createBlog(req, res, next){
        try {
            const blogDataBody=await createBlogSchema.validateAsync(req.body)
            req.body.image=path.join(blogDataBody.fileUploadPath, blogDataBody.filename)
            req.body.image=  req.body.image.replace(/\\/g,"/")
            const {title, text, short_text,tags, category , reference}=blogDataBody 
            const image=req.body.image
            const blog=await BlogModel.create({title, text, short_text,tags,image, category, reference})
            return res.status(HttpStatus.CREATED).json({
                status:HttpStatus.CREATED,
                data:{
                    message: "ایجاد بلاگ با موفقیت انجام شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error)
        }

    }
    async getOneBlogById(req, res, next){
        try {
            const {id}=req.params
            const blog=await this.findBlog(id)
            return res.status(HttpStatus.OK).json({
                statusCode:HttpStatus.OK,
                data:{
                    blog
                }
            })
        } catch (error) {
            next(error)
        }

    }
    async getListOfBlogs(req, res, next){
        try {
            // const blogs=await BlogModel.aggregate([
            //     {$match:{}},
            //     // {
            //     //     $lookup:{
            //     //         from:"categories",
            //     //         foreignField:"_id",
            //     //         localField:"category",
            //     //         as:"category"
            //     //     }
            //     // },
            //     // {
            //     //     $unwind:"$category"
            //     // }
            // ])
            const search=req?.query?.search || ""
            let blogs;
            if(search){
                blogs=await BlogModel
                .find({
                    $text:{$search: new RegExp(search, "ig")}})
                .populate([
                    { path:"category",select:{title:1}}
                 ])
            }else{
                blogs=await BlogModel.find({}).populate([
                   { path:"category",select:{title:1}}
                ])
            }
            return res.status(HttpStatus.OK).json({
                statusCode:HttpStatus.OK,
                data:{
                    blogs
                }
            })
            
        } catch (error) {
            next(error)
        }

    }
    async getCommentOfBlog(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }

    }
    async deleteBlogById(req, res, next){
        try {
            const {id}=req.params
            await this.findBlog(id)
            const result=await BlogModel.deleteOne({_id: id})
            if(result.deletedCount ==0 ) throw createError.InternalServerError("حذف با موفقیت انجام نشد")
            return res.status(HttpStatus.OK).json({
                statusCode:HttpStatus.OK,
                data:{
                    message: "مقاله با موفقیت حذف شد"
                }
        })
        } catch (error) {
            next(error)
        }

    }
    async updateBlogById(req, res, next){
        try {
            const {id}=req.params
            await this.findBlog(id)
            if(req?.body?.fileUploadPath && req?.body?.filename){
                req.body.image=path.join(req.body.fileUploadPath,req.body.filename)
                req.body.image=  req.body.image.replace(/\\/g,"/")
            }
            const data=req.body
            let nullishData=["", " ", null, "0", undefined]
            let blackList=["likes","dislikes","comments", "bookmarks"]
            Object.keys(data).forEach(key=>{
                if(blackList.includes(key)) delete data[key]
                if(typeof data[key] =="string") data[key]= data[key].trim()
                if(Array.isArray(data[key]) && data[key] .length > 0) data[key] = data[key].map(item=>item.trim())
                if(nullishData.includes(data[key])) delete data[key]
            })
            const updatedBlog=await BlogModel.updateOne({_id: id}, {$set:data})
            if(updatedBlog.modifiedCount == 0 ) throw createError.InternalServerError("به روز رسانی انجام نشد")
            return res.status(HttpStatus.OK).json({
                status:HttpStatus.OK,
                data:{
                    message: "با موفقیت به روز رسانی شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req?.body?.image)
            next(error)
        }

    }
    async findBlog(id){
        const blog=await BlogModel.findById(id).populate([{path:"category", select: ["title"]}])
        if(!blog) throw createError.NotFound("مقاله مورد نظر یافت نشد")
        return blog
    }
}

module.exports={
    AdminBlogController: new BlogController()
}