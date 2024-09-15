const { AdminCategoryController } = require("../../http/controllers/admin/category/category.controller")
const { uploadFile } = require("../../utils/multer")
const router=require("express").Router()

router.post("/add", AdminCategoryController.addCategory)
router.get("/parents",AdminCategoryController.getAllParents)
router.get("/children/:parent", AdminCategoryController.getChildOfParents)
router.get("/all", AdminCategoryController.getAllCategory)
router.get("/list-of-all", AdminCategoryController.getAllCategoryWithoutPopulate)
router.patch("/image/add/:id",uploadFile.single("image"),AdminCategoryController.addImage)
router.patch("/update/:id", AdminCategoryController.editCategory)
router.get("/:id", AdminCategoryController.getCategoryById)
router.delete("/remove/:id", AdminCategoryController.removeCategory)


module.exports={
    CategoryAdminApiRoutes: router
}