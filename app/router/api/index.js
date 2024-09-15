const homeCotroller = require("../../http/controllers/api/home.cotroller")
const { VerifyAccessToken } = require("../../http/midlewares/verifyAccessToen");
const { ApiPayment } = require("./payment");
const router=require("express").Router()

/**
 * @swagger
 * tags:
 *  - name: IndexPage
 *    description: IndexPage route and data
 */



/**
 * @swagger
 * tag: IndexPage
 * /:
 *  get:
 *      summary: index of routes
 *      tags: [IndexPage]
 *      description: getting all the data needed for indexPage
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              example: bearer yourToken..
 *      responses:
 *          '200':
 *              description: success
 *          '404':
 *              description: not found
 */

router.get("/",VerifyAccessToken, homeCotroller.indexPage)
router.use(ApiPayment);

module.exports={
    HomeRouter:router
}
