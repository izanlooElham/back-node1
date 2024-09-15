const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const {  publicCategoryType, UserType } = require("./public.types");
const { CommentType } = require("./comment.type");

const FeaturesType=new GraphQLObjectType({
    name:"features",
    fields:{
        length:{type: GraphQLString},
        weight:{type: GraphQLString},
        height:{type: GraphQLString},
        width:{type: GraphQLString}
    }
})

const ProductType=new GraphQLObjectType({
    name:"productType",
    fields:{
        _id:{type: GraphQLString}, 
        title:{type:GraphQLString},
        text:{type:GraphQLString},
        short_text:{type:GraphQLString},
        images:{type:new GraphQLList(GraphQLString)},
        tags:{type:new GraphQLList(GraphQLString)},
        category:{type: publicCategoryType},
        price:{type: GraphQLInt},
        discount:{type: GraphQLInt},
        count:{type: GraphQLInt},
        price:{type: GraphQLInt},
        features:{type: FeaturesType},
        comments:{type: new GraphQLList(CommentType)},
        likes:{type:new GraphQLList(UserType)},
        dislikes:{type:new GraphQLList(UserType)},
        bookmarks:{type:new GraphQLList(UserType)}

    }
})




module.exports={
    ProductType
}