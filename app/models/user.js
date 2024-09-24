const {default:mongoose}=require("mongoose")

const productSchema=new mongoose.Schema({
    productID:{type: mongoose.Types.ObjectId, ref:"product"},
    count:{type:Number, default:1}
})
const BasketSchema= new mongoose.Schema({
    products:{type:[productSchema], default:[]}
})
const Schema= new mongoose.Schema({
    first_name:{type:String},
    last_name:{type:String},
    address:{type:String, },
    postalCode:{type:String, },
    city:{type:String, },
    mobile:{type:String, required:true},
    password:{type:String, },
    bills:{type:[], default:[]},
    discount:{type:Number, default:0},
    otp:{type:Object, default:{
        code:0,
        expiresIn:0
    }},
    Role:{type:String, default:"USER"},
    Products : {type: [mongoose.Types.ObjectId], ref : "product", default : []},
    basket:{type: BasketSchema}


},{
    timestamps : true
})
Schema.index({first_name:"text", last_name:"text", mobile:"text", city:"text"})

module.exports={
    UserModel:mongoose.model("user",Schema)
}