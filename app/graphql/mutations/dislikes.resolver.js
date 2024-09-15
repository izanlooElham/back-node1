
const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");
const { VerifyAccessTokenInGraphQL } = require("../../http/midlewares/verifyAccessToen");
const { ProductModel } = require("../../models/product");
const createError=require("http-errors")
const {StatusCodes: HttpStatus}=require("http-status-codes");
const { BlogModel } = require("../../models/blog");
const { checkExistProduct, checkExistBlog } = require("../utils");


const disLikeProduct={
    type: ResponseType,
    args:{
        productID:{type: GraphQLString}
    },
    resolve:async(_,args,context)=>{
        const {req}= context
        const user=await VerifyAccessTokenInGraphQL(req)
        const {productID }= args 
        await checkExistProduct(productID)
        let likedproduct =await ProductModel.findOne({
            _id: productID,
            likes: user._id
        })
        let dislikedproduct =await ProductModel.findOne({
            _id: productID,
            dislikes: user._id
        })
        const updateQuery= dislikedproduct? {$pull:{dislikes: user._id}} : {$push:{ dislikes: user._id}}
        await ProductModel.updateOne({_id:productID}, updateQuery)
        let message;
        if(!dislikedproduct){
            if(likedproduct) await ProductModel.updateOne({_id: productID},{$pull:{likes:user._id}})
            message="نپسندیدن محصول با موفقیت انجام شد"
        }else message ="پسندیدن محصول لغو شد"
        return{
            statusCode:HttpStatus.CREATED,
            data:{
                message
            }
        }
    }
}
const disLikeBlog={
    type: ResponseType,
    args:{
        blogID:{type: GraphQLString}
    },
    resolve:async(_,args,context)=>{
        const {req}= context
        const user=await VerifyAccessTokenInGraphQL(req)
        const {blogID }= args
        await checkExistBlog(blogID)
        let likedblog =await BlogModel.findOne({
            _id: blogID,
            likes: user._id
        })
        let dislikedblog =await BlogModel.findOne({
            _id: blogID,
            dislikes: user._id
        })
        const updateQuery= dislikedblog ? {$pull:{dislikes: user._id}} : {$push:{ dislikes: user._id}}
        await BlogModel.updateOne({_id:blogID}, updateQuery)
        let message;
        if(!likedblog){
           if(dislikedblog) await BlogModel.updateOne({_id: blogID},{$pull:{likes:user._id}})
            message="بلاگ پسندیده شد"
              
        }else message ="پسندیدن بلاگ لغو شد"
        return{
            statusCode:HttpStatus.CREATED,
            data:{
                message
            }
        }
    }
}


module.exports={
    disLikeProduct,
    disLikeBlog
}