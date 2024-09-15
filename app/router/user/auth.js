const { UserAuthController } = require("../../http/controllers/user/auth/authController")
const router=require("express").Router()

router.post("/get-OTP",UserAuthController.getOTP)
router.post("/check-OTP",UserAuthController.checkOTP)
router.post("/check-refresh-token",UserAuthController.refreshToken)

module.exports={
    UserAuthRoutes:router
}