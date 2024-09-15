const { GraphQLObjectType, GraphQLString, GraphQLScalarType, Kind } = require("graphql");
const { toObject } = require("mongoose/lib/utils");
const { parseLiteral } = require("../utils");

const AnyType= new GraphQLScalarType({
    name:"anyType",
    parseValue: toObject,
    serialize: toObject,
    parseLiteral: parseLiteral
})

const publicCategoryType=new GraphQLObjectType({
    name:"publicCategoryType",
    fields:{
        _id:{type: GraphQLString},
        title:{type: GraphQLString},
  
    }
})
const UserType= new GraphQLObjectType({
    name:"UserType",
    fields:{
        _id:{type: GraphQLString},
        first_name:{type: GraphQLString},
        last_name:{type: GraphQLString}
    }
})
const ResponseType=new GraphQLObjectType({
    name:"responseType",
    fields:{
        statusCode:{ type : GraphQLString},
        data:{ type: AnyType}
         
    }
})

module.exports={
    publicCategoryType,
    AnyType,
    UserType,
    ResponseType
}