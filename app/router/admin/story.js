
const { AdminStoryController } = require("../../http/controllers/admin/story/story.controller")
const {  uploadVideo, uploadFile } = require("../../utils/multer")
const router=require("express").Router()


router.post("/add",uploadVideo.single("video"),AdminStoryController.addStory)
router.patch("/image/add/:id",uploadFile.single("image"),AdminStoryController.addImage)
router.get("/all",AdminStoryController.getAllStory)
router.delete("/delete/:id",AdminStoryController.deleteStory)


module.exports={
    StoryAdminApiRoutes: router
}