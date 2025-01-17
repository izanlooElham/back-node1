const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLInt, GraphQLScalarType } = require("graphql");
const { UserType } = require("./public.types");

const CommentAnswerType= new GraphQLObjectType({
    name:"CommentAnswerType",
    fields:{ 
        _id:{type: GraphQLString},
        user:{ type: UserType},
        comment:{ type: GraphQLString } ,
        createdAt:{ type: GraphQLInt} ,
        show: { type: GraphQLBoolean} ,
    }
})

const CommentType= new GraphQLObjectType({
    name:"commentType",
    fields:{
        _id:{type: GraphQLString},
        user:{ type: UserType},
        comment:{ type: GraphQLString },
        answers:{ type:new GraphQLList(CommentAnswerType)},
        show:{ type: GraphQLBoolean },
        openToComment:{ type:GraphQLBoolean },
        createdAt: { type: GraphQLInt }
    }
})

module.exports={
    CommentType
}