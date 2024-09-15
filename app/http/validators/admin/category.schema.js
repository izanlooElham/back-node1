const Joi=require("@hapi/joi")
const { MONGO_ID_PATTERN } = require("../../../utils/constanse")

const addCategorySchema=Joi.object({
    title:Joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمیباشد")),
    parent:Joi.string().allow("").pattern(MONGO_ID_PATTERN).error(new Error("شناسه ارسال شده صحیح نمیباشد")),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.gif|\.mov|\.mp4|\.mkv|\.mpg)$/).error(new Error("تصویر ارسال شده صحیح نمیباشد")),
    fileUploadPath: Joi.allow()
})
const updateCategorySchema=Joi.object({
    title:Joi.string().min(3).max(30).error(new Error("دسته بندی وارد شده صحیح نیست"))
})


module.exports={
    addCategorySchema,
    updateCategorySchema
}