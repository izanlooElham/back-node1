const Joi=require("@hapi/joi")
const { MONGO_ID_PATTERN } = require("../../../utils/constanse")



const createBlogSchema=Joi.object({
    title: Joi.string().min(3).max(40).error(new Error("عنوان دسته بندی صحیح نمیباشد")),
    text: Joi.string().error(new Error("متن ارسال شده صحیح نمیباشد")),
    short_text: Joi.string().error(new Error("متن ارسال شده صحیح نمیباشد")),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.gif)$/).error(new Error("تصویر ارسال شده صحیح نمیباشد")),
    tags:Joi.array().min(0).max(20).error(new Error("برچسب ها نمیتوانند بیش از 20 ایتم باشند")),
    reference:Joi.string().error(new Error("رفرنس ارسال شده صحیح نمیباشد")),
    category:Joi.string().error(new Error("دسته بندی مورد نظر یافت نشد")),
    fileUploadPath:Joi.allow()
})

module.exports={
    createBlogSchema
}