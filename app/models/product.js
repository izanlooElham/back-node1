const { default: mongoose } = require("mongoose");
const { commentSchema } = require("../http/validators/public.schema");


const Schema=new mongoose.Schema({
    title:{type:String, required:true},
    short_text: {type: String, required:true},
    text:{type:String, required:true},
    images:{type:[String], required:true},
    tags:{type:[String], default:[]},
    category: {type:mongoose.Types.ObjectId, ref:"category", required: true},
    comments:{type:[commentSchema],default:[]},
    likes:{type:[mongoose.Types.ObjectId],ref:"user", default:[]},
    dislikes:{type:[mongoose.Types.ObjectId],ref:"user", default:[]},
    bookmarks:{type: [mongoose.Types.ObjectId],ref:"user",default:[]},
    price:{type: Number, default:0},
    discount:{type:Number, default:0},
    count:{type:Number},
    feature:{type:Object,
        default:{
            length: "",
            weight:"",
            height:"",
            width:""
        }
    },
   
})
Schema.index({text:"text", short_text:"text", title:"text"})

module.exports={
    ProductModel: mongoose.model("product", Schema)
}