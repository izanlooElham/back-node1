const { type } = require("@hapi/joi/lib/extend");
const { default: mongoose } = require("mongoose");


const Schema=new mongoose.Schema({
    title:{type:String, required:true},
    parent:{type:mongoose.Types.ObjectId,ref:"category", default:undefined},
    image:{type:String}
},{
    id:false,
    toJSON:{
        virtuals:true
    }
})
Schema.virtual("children",{
    foreignField:"parent",
    localField:"_id",
    ref:"category"
})

function autoPopulate(next){
    this.populate([{path: "children", select:{__v:0 , id:0}}])
    next()
}

Schema.pre("findOnde",autoPopulate).pre("find",autoPopulate)

module.exports={
    CategoryModel: mongoose.model("category", Schema)
}