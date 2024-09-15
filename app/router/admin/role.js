const { RoleController } = require("../../http/controllers/admin/RBAC/role.controller")
const { stringToArray } = require("../../http/midlewares/stringToArray")
const router=require("express").Router()

router.get("/list",RoleController.getAllRoles)
router.post("/add", stringToArray("permissions"),RoleController.CreateNewRole)
router.delete("/remove/:field", RoleController.removeRole)
router.patch("/update/:field",stringToArray("permissions"), RoleController.updateRoleById)
module.exports={
    AdminApiRoleRoutes:router
}