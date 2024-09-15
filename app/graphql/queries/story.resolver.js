const { GraphQLList } = require("graphql")
const { StoryModel } = require("../../models/story")


const StoryResolver={
    type: new GraphQLList(StoryType),
    resolve: async ()=>{
        return await StoryModel.find({})
    }
}

module.exports={
    StoryResolver
}