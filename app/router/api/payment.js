const { PaymentController } = require("../../http/controllers/api/payment.controller")
const { VerifyAccessToken } = require("../../http/midlewares/verifyAccessToen")

const router=require("express").Router()

router.post("/payment", VerifyAccessToken,PaymentController.PaymentGateway)
router.get("/verify", PaymentController.VerifyPayment)


module.exports={
    ApiPayment: router
}