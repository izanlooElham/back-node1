const { AdminProductController } = require("../../http/controllers/admin/product/product.controller")
const { stringToArray } = require("../../http/midlewares/stringToArray")
const { uploadFile } = require("../../utils/multer")
const router=require("express").Router()



router.post("/add",uploadFile.array("images",5),stringToArray("tags"), AdminProductController.addProduct)
router.get("/list", AdminProductController.getAllProduct)
router.get("/:id", AdminProductController.getOneProductById)
router.patch("/update/:id",uploadFile.array("images",5),stringToArray("tags"), AdminProductController.editProduct)
router.delete("/remove/:id",AdminProductController.removeProductById)


module.exports={
    ProductAdminApiRoutes:router
}