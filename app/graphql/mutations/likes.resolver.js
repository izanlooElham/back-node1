const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");
const { VerifyAccessTokenInGraphQL } = require("../../http/midlewares/verifyAccessToen");
const { ProductModel } = require("../../models/product");
const createError=require("http-errors")
const {StatusCodes: HttpStatus}=require("http-status-codes");
const { BlogModel } = require("../../models/blog");
const { checkExistProduct, checkExistBlog } = require("../utils");


const LikeProduct={
    type: ResponseType,
    args:{
        productID:{type: GraphQLString}
    },
    resolve:async(_,args,context)=>{
        const {req}= context
        const user=await VerifyAccessTokenInGraphQL(req)
        const {productID }= args 
        await checkExistProduct(productID)
        console.log("a")
        let likedproduct =await ProductModel.findOne({
            _id: productID,
            likes: user._id
        })
        console.log("b")
        let dislikedproduct =await ProductModel.findOne({
            _id: productID,
            dislikes: user._id
        })
        console.log("c")
        const updateQuery= likedproduct? {$pull:{likes: user._id}} : {$push:{ likes: user._id}}
        console.log("d")
        await ProductModel.updateOne({_id:productID}, updateQuery)
        console.log("e")
        let message;
        if( !likedproduct){
           if(dislikedproduct) await ProductModel.updateOne({_id: productID},{$pull:{dislikes:user._id}})
            message="محصول پسندیده شد"
        }else message ="پسندیدن محصول لغو شد"
        return{
            statusCode:HttpStatus.CREATED,
            data:{
                message
            }
        }
    }
}
const LikeBlog={
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
        const updateQuery= likedblog ? {$pull:{likes: user._id}} : {$push:{ likes: user._id}}
        await BlogModel.updateOne({_id:blogID}, updateQuery)
        let message;
        if(!likedblog){
           if(dislikedblog) await BlogModel.updateOne({_id: blogID},{$pull:{dislikes:user._id}})
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
    LikeProduct,
    LikeBlog
}