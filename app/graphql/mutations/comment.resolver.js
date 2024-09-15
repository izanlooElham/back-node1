const {  GraphQLString } = require("graphql");
const { VerifyAccessTokenInGraphQL } = require("../../http/midlewares/verifyAccessToen");
const { BlogModel } = require("../../models/blog");
const createError=require("http-errors")
const {StatusCodes: HttpStatus}=require("http-status-codes");
const { ResponseType } = require("../typeDefs/public.types");
const { copyObject } = require("../../utils/functions");
const mongoose = require("mongoose/lib/mongoose");
const { checkExistProduct, checkExistBlog } = require("../utils");
const { ProductModel } = require("../../models/product");

const CreateCommentForBlog={
    type: ResponseType,
    args:{
        comment: {type: GraphQLString},
        blogID:{type: GraphQLString},
        parent:{type: GraphQLString}
    },
    resolve: async (_,args, context)=>{
        const {req}= context
        const user=await VerifyAccessTokenInGraphQL(req)
        const {comment, blogID, parent}= args
        if(!mongoose.isValidObjectId(blogID)) throw createError.BadRequest("شناسه ارسال شده صحیح نمیباشد")
        await checkExistBlog(blogID)
        if(parent && mongoose.isValidObjectId(parent)){
            const commentDocument= await getComment(BlogModel, parent)
            if(commentDocument && !commentDocument?.openToComment) throw createError.BadRequest("ثبت پاسخ مجاز نیست")
            const createAnswerResult= await BlogModel.updateOne({
                "comments._id": parent
        },{
            $push:{
                "comments.$.answers":{
                    comment,
                    user: user._id,
                    show: false,
                    openToComment: false
                }
              
            }
        })
        if(!createAnswerResult.modifiedCount) throw createError.InternalServerError("ثبت پاسخ انجام نشد")
        return {
            statusCode : HttpStatus.CREATED,
            data:{
                message: "پاسخ شما با موفقیت ثبت شد"
                }

        }
        
        }else{
            await BlogModel.updateOne({_id: blogID},{
                    $push:{
                        comments:{
                            comment,
                            user:user._id,
                            show: false,
                            openToComment: true
                        }
                    }
                })

        }
        return {
            statusCode:HttpStatus.CREATED,
            data:{
                message: "ثبت نظر با موفقیت انجام شد و پس از تایید در وبسایت قرار میگیرد"
            }
        }
    }
}

const CreateCommentForProduct={
    type: ResponseType,
    args:{
        comment: {type: GraphQLString},
        productID:{type: GraphQLString},
        parent:{type: GraphQLString}
    },
    resolve: async (_,args, context)=>{
        const {req}= context
        const user=await VerifyAccessTokenInGraphQL(req)
        const {comment, productID, parent}= args
        if(!mongoose.isValidObjectId(productID)) throw createError.BadRequest("شناسه ارسال شده صحیح نمیباشد")
        await checkExistProduct(productID)
        if(parent && mongoose.isValidObjectId(parent)){
            const commentDocument= await getComment(ProductModel, parent)
            if(commentDocument && !commentDocument?.openToComment) throw createError.BadRequest("ثبت پاسخ مجاز نیست")
            const createAnswerResult= await ProductModel.updateOne({
                _id: productID,
                "comments._id": parent
        },{
            $push:{
                "comments.$.answers":{
                    comment,
                    user: user._id,
                    show: false,
                    openToComment: false
                }
              
            }
        })
        if(!createAnswerResult.modifiedCount) throw createError.InternalServerError("ثبت پاسخ انجام نشد")
        return {
            statusCode : HttpStatus.CREATED,
            data:{
                message: "پاسخ شما با موفقیت ثبت شد"
                }

        }
        
        }else{
            await ProductModel.updateOne({_id: productID},{
                    $push:{
                        comments:{
                            comment,
                            user:user._id,
                            show: false,
                            openToComment: true
                        }
                    }
                })

        }
        return {
            statusCode:HttpStatus.CREATED,
            data:{
                message: "ثبت نظر با موفقیت انجام شد و پس از تایید در وبسایت قرار میگیرد"
            }
        }
    }
}

async function getComment(model, id){
    const findedcomment=await model.findOne({"comments._id": id},{"comments.$":1})
    const comment=copyObject(findedcomment)
    if(!comment?.comments?.[0]) throw createError.NotFound("کامنتی با این مشخصات یافت نشد")
    return comment?.comments?.[0]
}


module.exports={
    CreateCommentForBlog,
    CreateCommentForProduct
}