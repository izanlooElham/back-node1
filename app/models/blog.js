const { default: mongoose } = require("mongoose");
const { commentSchema } = require("../http/validators/public.schema");

const Schema=new mongoose.Schema({
    title:{type:String, required: true},
    text:{type:String, required: true},
    short_text:{type:String, required: true},
    image:{type:String, required: true},
    tags:{type:[String], default:[]},
    category:{type: [mongoose.Types.ObjectId], required:true},
    comments:{type: [commentSchema], default:[]},
    likes:{type: [mongoose.Types.ObjectId],ref:"users", default:[]},
    dislikes:{type:[mongoose.Types.ObjectId],ref:"users", default:[]},
    bookmarks:{type:[mongoose.Types.ObjectId],ref:"users", default:[]}
},
{
    timestamps:true,
    versionKey:false,
    id:false,
    toJSON:{
        virtuals:true
    }
})
Schema.virtual("category_detail",{
    foreignField:"category",
    localField:"_id",
    ref:"category"
})

module.exports={
    BlogModel: mongoose.model("blog", Schema)
}