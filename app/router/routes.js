
const { graphqlHTTP } = require("express-graphql")
const { VerifyAccessToken, checkRole } = require("../http/midlewares/verifyAccessToen")
const { AdminRoutes } = require("./admin/admin.routes")
const { HomeRouter } = require("./api")
const { UserAuthRoutes } = require("./user/auth")
const { graphqlConfig } = require("../utils/graphql.config")
const router=require("express").Router()


router.use("/", HomeRouter)
router.use("/user", UserAuthRoutes)
router.use("/admin", AdminRoutes)
router.use("/graphql", graphqlHTTP(graphqlConfig))


module.exports={
    AllRoutes: router
}