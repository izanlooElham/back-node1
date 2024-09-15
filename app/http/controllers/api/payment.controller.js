const { default: axios } = require("axios");
const { UserModel } = require("../../../models/user");
const Controller = require("../controller");
const createError=require("http-errors");
const { getBasketOfUser, invoiceNumberGenerator } = require("../../../utils/functions");
const { PaymentModel } = require("../../../models/payment");
const moment=require("jalali-moment")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {StatusCodes:HttpStatus}=require("http-status-codes")



class PaymentController extends Controller{
        async PaymentGateway(req, res, next ){
            try {
                const user=req.user
                if(user.basket.products.length === 0) throw new createError.BadRequest("سبد خرید شما خالی میباشد")
                const basket=await getBasketOfUser(user._id)
                if(!basket?.payDetail?.paymentAmount) throw new createError.BadRequest("مشخصات پرداخت یافت نشد")
                const zarinpal_request_url= "https://api.zarinpal.com/pg/v4/payment/request.json"
                const zarinpalGateWayURL="https://www.zarinpal.com/pg/StarPay/"
                const amount=!basket?.paymentDetail?.paymentAmount
                const description="بابت خرید محصولات"
                const zarinpal_options={
                    merchant_id: process.env.ZARINPAL_MERCHANTID,
                    amount, 
                    description,
                    metadata:{
                        email: user?.email || "izanlooelham2@gmail.com",
                        mobile: user.mobile
                    },
                    callback_url:"http://localhost:4000/verify"
                }
                const RequestResult= await axios.post( zarinpal_request_url,zarinpal_options).then(result => result.data)
                const {authority,code}=RequestResult.data
                await PaymentModel.create({
                    invoiceNumber: invoiceNumberGenerator(),
                    paymentDate:moment().format("jYYYYjMMjDDHHmmssSSS") ,
                    amount,
                    user: user._id,
                    description,
                    authority,
                    verify: false,
                    basket
                    
                })
                if(code == 100 && authority){
                    return res.json({
                        code,
                        gateWayURL:`${zarinpalGateWayURL}/${authority}`
                    })
                }
                throw createError.BadRequest("پارامترهای ارسال شده صحیح نمیباشد")
            } catch (error) {
                next(error)
            }
        }
        async VerifyPayment(req, res, next){
            try {
                const {Authority: authority}= req.query
                const verifyURL="https://api.zarinpal.com/pg/v4/payment/verify.json"
                const payment=await PaymentModel.findOne({authority})
                if(!payment) throw createError.NotFound("تراکنش در انتظار پرداخت یافت نشد")
                if(payment.verify) throw createError.BadRequest("تراکنش مورد نظر قبلا پرداخت  شده")
                const verifyBody=JSON.stringify({
                    authority,
                    amount: payment.amount,
                    merchant_id: process.env.ZARINPAL_MERCHANTID
                })
                const verifyResult= await fetch(verifyURL,{
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: verifyBody
                }).then(result => result.json())
                if(verifyResult.data.code == 100){
                    await PaymentModel.updateOne({authority},{
                        $set:{
                           refID: verifyResult.data.ref_id,
                           cardHash: verifyResult.data.card_hash,
                           verify: true 
                        }
                    })
                    const user= await UserModel.findById(payment.user) 
                    await UserModel.updateOne({authority},{
                        $set:{
                           Products:[...payment?.basket?.payDetail?.productIds || [], ...user.Products],
                           basket:{
                            Products: []
                           }
                        }
                    })
                    return res.status(HttpStatus.OK).json({
                       statusCode: HttpStatus.OK,
                       data:{
                         message: "پرداخت شما با موفقیت انجام شد"
                       }
                    })
                }
                throw createError.BadRequest("پرداخت انجام نشد در صورت کسر وجه طی 24 ساعت به حساب شما باز میگردد ")
            } catch (error) {
                next(error)
            }
        }
}


module.exports={
    PaymentController: new PaymentController()
}