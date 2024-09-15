const { GraphQLList, GraphQLString } = require("graphql")
const { BlogType } = require("../typeDefs/blog.type")
const { BlogModel } = require("../../models/blog")
const { VerifyAccessTokenInGraphQL } = require("../../http/midlewares/verifyAccessToen")
const { ProductType } = require("../typeDefs/product.type")
const { ProductModel } = require("../../models/product")
const { AnyType } = require("../typeDefs/public.types")
const { UserModel } = require("../../models/user")
const { getBasketOfUser } = require("../../utils/functions")

const getUserBookmarkedProduct={
    type: new GraphQLList(ProductType),
    resolve: async (_,args,context)=>{
        const {req}= context
        const user=await VerifyAccessTokenInGraphQL(req)
        const products=await ProductModel.find({bookmarks: user._id }).populate([{path: "category"},
            {path: "comments.user"},
            {path: "comments.answers.user"},
            {path:"likes"},
            {path:"dislikes"},
            {path: "bookmarks"}
        ])
        return products
        
    }
}
const getUserBookmarkedBlog={
    type: new GraphQLList(BlogType),
    resolve: async (_,args,context)=>{
        const {req}= context
        const user=await VerifyAccessTokenInGraphQL(req)
        const blogs=await BlogModel.find({bookmarks: user._id }).populate([{path: "category"}
            ,{path: "comments.user"}
            ,{path: "comments.answers.user"},
            {path:"likes"},
            {path:"dislikes"},
            {path: "bookmarks"}
        ])
        return blogs
        
    }
}
const getUserBasket={
    type: AnyType,
    resolve: async (_,args,context)=>{
        const {req}= context
        const user=await VerifyAccessTokenInGraphQL(req)
        const userDetail= await getBasketOfUser(user._id)
        return userDetail
    }
}

module.exports={
    getUserBookmarkedBlog,
    getUserBookmarkedProduct,
    getUserBasket
}