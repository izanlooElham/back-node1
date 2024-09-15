const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const {  publicCategoryType, UserType } = require("./public.types");
const { CommentType } = require("./comment.type");



const BlogType=new GraphQLObjectType({
    name:"blogType",
    fields:{
        _id:{type: GraphQLString}, 
        title:{type:GraphQLString},
        text:{type:GraphQLString},
        short_text:{type:GraphQLString},
        image:{type:GraphQLString},
        tags:{type:new GraphQLList(GraphQLString)},
        category:{type: publicCategoryType},
        comments:{type: new GraphQLList(CommentType)},
        likes:{type:new GraphQLList(UserType)},
        dislikes:{type:new GraphQLList(UserType)},
        bookmarks:{type:new GraphQLList(UserType)}
    }
})

module.exports={
    BlogType
}