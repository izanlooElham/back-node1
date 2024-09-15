const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const {  publicCategoryType } = require("./public.types");

const StoryType=new GraphQLObjectType({
    name:"storyType",
    fields:{
        _id:{type: GraphQLString}, 
        title:{type:GraphQLString},
        time:{type:GraphQLString},
        videoAddress:{type: GraphQLString}
    }
})

module.exports={
    StoryType
}