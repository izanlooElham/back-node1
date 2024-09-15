const { createProductSchema } = require("../../../validators/admin/product.schema");
const Controller = require("../../controller");
const {StatusCodes:HttpStatus}=require("http-status-codes")
const createError=require("http-errors");
const { deleteFileInPublic, ListOfImagesFromRequest, copyObject, setFeatures, deleteInvalidPropertyInObject } = require("../../../../utils/functions");
const path=require("path");
const { ProductModel } = require("../../../../models/product");
const { ObjectIdValidator } = require("../../../validators/public.validator");
const productBlackList={
    BOOKMARKS:"bookmarks",
    LIKES:"likes",
    DISLIKES:"dislikes",
    COMMENTS:"comments",
    WIDTH:"width",
    WEIGHT:"weight",
    LENGTH:"length",
    HEIGHT:"height"
}
Object.freeze(productBlackList)

class ProductController extends Controller{
    async addProduct(req, res, next){
        try {
            const images=ListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath)
            const productBody=await createProductSchema.validateAsync(req.body)
            const {title, text, short_text, tags, category, count, discount, price}=productBody
            let feature=setFeatures(req.body)
            const product=await ProductModel.create({title, text, short_text, tags, category, count, discount, price, images, feature})
            return res.status(HttpStatus.CREATED).json({
                statusCode:HttpStatus.CREATED,
                data:{
                    message: "محصول با موفقیت ثبت شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error)
        }
    }
    async getAllProduct(req, res, next){
        try {
            const search=req?.query?.search || ""
            let products;
            if(search){
                products=await ProductModel
                .find({
                    $text:{$search: new RegExp(search, "ig")}})
                .populate([
                    { path:"category",select:{title:1}}
                 ])
            }else{
                products=await ProductModel.find({}).populate([
                   { path:"category",select:{title:1}}
                ])
            }
            return res.status(HttpStatus.OK).json({
                statusCode:HttpStatus.OK,
                data:{
                    products
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async editProduct(req, res, next){
        try {
            const{id}=req.params
            const product=await this.findProductById(id)
           const data=copyObject(req.body) 
           data.images=ListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath)
           data.features=setFeatures(req.body)
            let blackList=Object.values(productBlackList)
            deleteInvalidPropertyInObject(data, blackList)
            const updatedProduct=await ProductModel.updateOne({_id : product._id},{$set: data})
            if(updatedProduct.modifiedCount==0) throw {status : HttpStatus.INTERNAL_SERVER_ERROR, message:"خطای داخلی"}
            return res.status(HttpStatus.OK).json({
                statusCode:HttpStatus.OK,
                data:{

                    message:"به روز رسانی با موفقیت انجام شد"
                }

            })
       
        } catch (error) {
            next(error)
        }
    }
    async removeProductById(req, res, next){
        try {
            const {id}=req.params
            const product=await this.findProductById(id)
            const removedProdut=await ProductModel.deleteOne({_id: product._id})
            if(removedProdut.deletedCount == 0) throw createError.InternalServerError("موفق نبود")
            return res.status(HttpStatus.OK).json({
                statusCode:HttpStatus.OK,
                data:{
                    message: "حذف محصول با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getOneProductById(req, res, next){
        try {
            const {id}=req.params
            const product=await this.findProductById(id)
            return res.status(HttpStatus.OK).json({
                statusCode:HttpStatus.OK,
                data:{
                    product
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async findProductById(productId){
        const {id}=await ObjectIdValidator.validateAsync({id: productId})
        const product=await ProductModel.findById(id)
        if(!product) throw createError.NotFound("محصولی یافت نشد")
        return product
    }
}

module.exports={
    AdminProductController: new ProductController()
}