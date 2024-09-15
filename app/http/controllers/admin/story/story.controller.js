const { default: getVideoDurationInSeconds } = require("get-video-duration");
const { createStorySchema } = require("../../../validators/admin/story.schema");
const Controller = require("../../controller");
const { StoryModel } = require("../../../../models/story");
const {StatusCodes:HttpStatus}=require("http-status-codes")
const createError=require("http-errors");
const path=require("path")


class StoryController extends Controller{
        async addStory(req, res , next){
            try {
                const storyDataBody =await createStorySchema.validateAsync(req.body)
                req.body.video= path.join(storyDataBody.fileUploadPath,storyDataBody.filename)
                req.body.video= req.body.video.replace(/\\/g,"/")
                const video= req.body.video
                const{title}=storyDataBody
                const story=await StoryModel.create({title,video}) 
                return res.status(HttpStatus.CREATED).json({
                    statusCode: HttpStatus.CREATED,
                    data:{
                        message:"استوری با موفقیت ذخیره شد"
                    }
                })
            } catch (error) {
                next(error)
            }
        }
        async getAllStory(req, res, next){
            try {
                const stories=await StoryModel.find({})
                return res.status(HttpStatus.OK).json({
                    statusCode: HttpStatus.OK,
                    data:{
                        stories
                    }
                })
            } catch (error) {
                next(error)
            }
        }
        async deleteStory(req, res, next){
            try {
                const {id}= req.params
                const deletedStory= await StoryModel.deleteOne({_id: id})
                return res.status(HttpStatus.OK).json({
                    statusCode: HttpStatus.OK,
                    message: "استوری با موفقیت حذف شد"
                })
            } catch (error) {
                next(error)
            }
        }
        async addImage(req, res, next){
            try {
                const {id}=req.params
                const storyDataBody =await createStorySchema.validateAsync(req.body)
                req.body.image= path.join(storyDataBody.fileUploadPath,storyDataBody.filename)
                req.body.image= req.body.image.replace(/\\/g,"/")
                const image= req.body.image
                const story=await StoryModel.updateOne({_id: id}, {$set:{image}}) 
                return res.status(HttpStatus.OK).json({
                    statusCode: HttpStatus.OK,
                    data:{
                        message:"عکس با موفقیت ذخیره شد"
                    }
                })
            } catch (error) {
               next(error) 
            }
        }
}


module.exports={
    AdminStoryController: new StoryController()
}