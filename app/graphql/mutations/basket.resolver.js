const { GraphQLString, GraphQLInt } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");
const { VerifyAccessTokenInGraphQL } = require("../../http/midlewares/verifyAccessToen");
const createError=require("http-errors")
const {StatusCodes: HttpStatus}=require("http-status-codes");
const { checkExistProduct } = require("../utils");
const { UserModel } = require("../../models/user");
const { copyObject } = require("../../utils/functions");


const AddProductToBasket={
    type: ResponseType,
    args:{
        productID:{type: GraphQLString}
    },
    resolve:async(_,args,context)=>{
        const {req}= context
        const user=await VerifyAccessTokenInGraphQL(req)
        const {productID}= args 
        await checkExistProduct(productID)
        const product = await findProductInBasket(user._id, productID)
        if(product){
            await UserModel.updateOne(
                {
                _id: user._id,
                "basket.products.productID":productID
                },
                {
                    $inc:{
                        "basket.products.$.count":1
                    }
                }
        )
        }else{
            await UserModel.updateOne(
                {
                _id: user._id
                },
                {
                    $push:{
                        "basket.products":{
                            productID,
                            count:1 
                        }
                    }
                }
        )
        }
       return{
            statusCode:HttpStatus.OK,
            data:{
                message:"محصول به سبد خرید افزوده شد"
            }
       }
    
    }
}
const RemoveProductFromBasket={
    type: ResponseType,
    args:{
        productID:{type: GraphQLString}
    },
    resolve:async(_,args,context)=>{
        const {req}= context
        const user=await VerifyAccessTokenInGraphQL(req)
        const {productID}= args 
        await checkExistProduct(productID)
        const product = await findProductInBasket(user._id, productID)
        let message;
        if(!product) throw createError.NotFound("محصول مورد نظر در سبد خرید یافت نشد")
        if(product.count >1){
            await UserModel.updateOne(
                {
                _id: user._id,
                "basket.products.productID":productID
                },
                {
                    $inc:{
                        "basket.products.$.count": -1
                    }
                },
                message="یک عدد از محصول از داخل سبد خرید کم شد"
        )
        }else{
            await UserModel.updateOne(
                {
                _id: user._id,

                },
                {
                    $pull:{
                        "basket.products":{
                            productID 
                        }
                    }
                },
                message="محصول از داخل سبد خرید کم شد"
        )
        }
       return{
            statusCode:HttpStatus.OK,
            data:{
                message
            }
       }
       
    
    }
}

async function findProductInBasket(userID, productID){
    const findResult = await UserModel.findOne({_id: userID, "basket.products.productID": productID},{"basket.products.$":1})
    const  userDetails=copyObject(findResult)
    return userDetails?.basket?.products?.[0]
}


module.exports={
    AddProductToBasket,
    RemoveProductFromBasket
}