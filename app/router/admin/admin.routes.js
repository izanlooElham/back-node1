const { BlogAdminApiRoutes } = require("./blog")
const { CategoryAdminApiRoutes } = require("./category")
const { AdminApiPermissionRoutes } = require("./permission")
const { ProductAdminApiRoutes } = require("./product")
const { AdminApiRoleRoutes } = require("./role")
const { StoryAdminApiRoutes } = require("./story")
const { AdminApiTransactionRouter } = require("./transaction")
const { UserAdminApiRoutes } = require("./user")
const router=require("express").Router()
/**
 * @swagger
 *  tags:
 *  -   name: Admin-Panel
 *      description: All the Actions of Admin
 *  -   name: Users(Admin-Panel)
 *      description: User managment
 *  -   name: TransActions(Admin-Panel)
 *      description: get All the transactions
 *  -   name: RBAC(Admin-Panel)
 *      description: RBAC managment
 *  -   name: Product(Admin-Panel)
 *      description: Product managment
 *  -   name: Category(Admin-Panel)
 *      description: category managment
 *  -   name: Blog(Admin-Panel)
 *      description: Blog managment
 *  -   name: Story(Admin-Panel)
 *      description: Story managment
 */

router.use("/category", CategoryAdminApiRoutes)
router.use("/blogs", BlogAdminApiRoutes)
router.use("/products", ProductAdminApiRoutes)
router.use("/story", StoryAdminApiRoutes)
router.use("/user", UserAdminApiRoutes)
router.use("/role", AdminApiRoleRoutes)
router.use("/permission", AdminApiPermissionRoutes)
router.use("/transactions", AdminApiTransactionRouter)

module.exports={
    AdminRoutes: router
}