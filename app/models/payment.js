const mongoose = require("mongoose/lib/mongoose");

const Schema= new mongoose.Schema({
    invoiceNumber:{type:String},
    authority:{type:String},
    amount:{type: Number},
    description:{type: String, default:"بابت خرید محصول"},
    verify:{ type: Boolean, default:false},
    user:{type: mongoose.Types.ObjectId,ref:"user"},
    basket:{type:Object, default:{}},
    paymentDate:{type: Number},
    refID:{type:String, default:undefined },
    cardHash:{type:String, default:undefined}
},{
    timestamps : true
})

module.exports={
    PaymentModel: mongoose.model("payment", Schema)
}