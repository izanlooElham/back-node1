const Joi=require("@hapi/joi")
const createError=require("http-errors")

const createStorySchema=Joi.object({
    title:Joi.string().min(3).max(30).error(new Error(createError.BadRequest("عنوان مورد نشز یافت نشد"))),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.gif|\.mov|\.mp4|\.mkv|\.mpg)$/).error(new Error("تصویر ارسال شده صحیح نمیباشد")),
    fileUploadPath: Joi.allow()
})

module.exports={
    createStorySchema
}