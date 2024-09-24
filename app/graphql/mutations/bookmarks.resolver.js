const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");
const { VerifyAccessTokenInGraphQL } = require("../../http/midlewares/verifyAccessToen");
const { ProductModel } = require("../../models/product");
const createError=require("http-errors")
const {StatusCodes: HttpStatus}=require("http-status-codes");
const { BlogModel } = require("../../models/blog");
const { checkExistProduct, checkExistBlog } = require("../utils");


const BookmarkProduct={
    type: ResponseType,
    args:{
        productID:{type: GraphQLString}
    },
    resolve:async(_,args,context)=>{
        console.log("a")
        const {req}= context
        console.log("b")
        const user=await VerifyAccessTokenInGraphQL(req)
        console.log("c")
        const {productID }= args 
        console.log("d")
        await checkExistProduct(productID)
        console.log("e")
        let Bookmarkedproduct =await ProductModel.findOne({
            _id: productID,
            bookmarks: user._id
        })
       
        const updateQuery= Bookmarkedproduct? {$pull:{bookmarks: user._id}} : {$push:{ bookmarks: user._id}}
        await ProductModel.updateOne({_id:productID}, updateQuery)
        let message;
        if( !Bookmarkedproduct){
            message="محصول به لیست علاقه مندی اضافه شد"
        }else message =" محصول از لیست علاقه مندی ها حذف شد"
        return{
            statusCode:HttpStatus.CREATED,
            data:{
                message
            }
        }
    }
}
const BookmarkBlog={ 
    type: ResponseType,
    args:{
        blogID:{type: GraphQLString}
    },
    resolve:async(_,args,context)=>{
        const {req}= context
        const user=await VerifyAccessTokenInGraphQL(req)
        const {blogID }= args
        await checkExistBlog(blogID)
        let bookmarkedblog =await BlogModel.findOne({
            _id: blogID,
            bookmarks: user._id
        })
        const updateQuery= bookmarkedblog ? {$pull:{bookmarks: user._id}} : {$push:{ bookmarks: user._id}}
        await BlogModel.updateOne({_id:blogID}, updateQuery)
        let message;
        if(!bookmarkedblog){
           if(dislikedblog) await BlogModel.updateOne({_id: blogID},{$pull:{dislikes:user._id}})
            message="بلاگ به لیست علاقه مندی شد"            
        }else message ="بلاگ از لیست علاقه مندی ها حذف شد"
        return{
            statusCode:HttpStatus.OK,
            data:{
                message
            }
        }
    }
}


module.exports={
    BookmarkProduct,
    BookmarkBlog
}