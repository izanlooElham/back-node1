const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { ProductResolver } = require("./queries/product.resolver");
const { CategoryResolver, CategoryChildResolver } = require("./queries/category.resolver");
const { CreateCommentForBlog, CreateCommentForProduct } = require("./mutations/comment.resolver");
const { LikeProduct, LikeBlog } = require("./mutations/likes.resolver");
const { disLikeProduct, disLikeBlog } = require("./mutations/dislikes.resolver");
const { BookmarkProduct, BookmarkBlog } = require("./mutations/bookmarks.resolver");
const { getUserBookmarkedBlog, getUserBookmarkedProduct } = require("./queries/user-profile.resolver");
const { AddProductToBasket, RemoveProductFromBasket } = require("./mutations/basket.resolver");


const RootQuery=new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        blogs: BlogResolver,
        products: ProductResolver,
        categories: CategoryResolver,
        childOfCategory: CategoryChildResolver,
    }
})

const RootMutation=new GraphQLObjectType({
    name:"Mutation",
    fields:{
        CreateCommentForBlog,
        CreateCommentForProduct,
        LikeProduct,
        LikeBlog,
        disLikeProduct,
        disLikeBlog,
        BookmarkProduct,
        BookmarkBlog,
        getUserBookmarkedBlog,
        getUserBookmarkedProduct,
        AddProductToBasket,
        RemoveProductFromBasket

    }
})

const graphQLSchema=new GraphQLSchema({
    query:RootQuery,
    mutation:RootMutation
}) 

module.exports={
    graphQLSchema
}