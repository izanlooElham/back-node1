const { default: mongoose } = require("mongoose");

const Schema=new mongoose.Schema({
    title:{type: String, required: true},
    video:{type:String, required: true},
    image:{type:String}
})

module.exports={
    StoryModel: mongoose.model("story", Schema)
}