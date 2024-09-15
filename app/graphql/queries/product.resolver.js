const { GraphQLList, GraphQLString } = require("graphql")
const { ProductModel } = require("../../models/product")
const { ProductType } = require("../typeDefs/product.type")


const ProductResolver={
    type: new GraphQLList(ProductType),
    args:{
        _id: {type: GraphQLString}
    },
    resolve: async (_,args)=>{
        const {_id}=args
        const findQuery=_id ? {_id} : {}
        return await ProductModel.find(findQuery).populate([{path: "_id"},
            {path: "comments.user"},
            {path: "comments.answers.user"},
            {path:"likes"},
            {path:"dislikes"},
            {path: "bookmarks"},
            {path: "category"},
        ])
    }
}

module.exports={
    ProductResolver
}