const userController = require("../../http/controllers/admin/user/user.controller")
const { AdminUserController } = require("../../http/controllers/admin/user/user.controller")
const { checkPermission } = require("../../http/midlewares/permission.guard")
const { VerifyAccessToken } = require("../../http/midlewares/verifyAccessToen")
const { PERMISSIONS } = require("../../utils/constanse")
const router=require("express").Router()


router.get("/all", AdminUserController.getAlluser)
router.patch("/update/:id", AdminUserController.updateUserProfile)
router.get("/profile",VerifyAccessToken, AdminUserController.userProfile)


module.exports={
    UserAdminApiRoutes: router
}