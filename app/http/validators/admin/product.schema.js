const Joi=require("@hapi/joi")
const { MONGO_ID_PATTERN } = require("../../../utils/constanse")



const createProductSchema=Joi.object({
    title: Joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمیباشد")),
    text: Joi.string().error(new Error("متن ارسال شده صحیح نمیباشد")),
    short_text: Joi.string().error(new Error("متن ارسال شده صحیح نمیباشد")),
    tags: Joi.array().min(0).max(20).error(new Error("برچسب ها نمیتوانند بیش از 20 ایتم باشند")),
    category: Joi.string().regex(MONGO_ID_PATTERN).error(new Error("دسته بندی مورد نظر یافت نشد")),
    price: Joi.number().error(new Error("قیمت وارد شده صحیح نمیباشد")),
    count: Joi.number().error(new Error("تعداد وارد شده صحیح نمیباشد")),
    discount: Joi.number().error(new Error("تخفیف وارد شده صحیح نمیباشد")),
    length: Joi.number().allow(null, 0, "0").error(new Error("طول وارد شده صحیح نمیباشد")),
    width: Joi.number().allow(null, 0, "0").error(new Error("عرض وارد شده صحیح نمیباشد")),
    weight: Joi.number().allow(null, 0, "0").error(new Error("وزن وارد شده صحیح نمیباشد")),
    height: Joi.number().allow(null, 0, "0").error(new Error("ارتفاع وارد شده صحیح نمیباشد")),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.gif)$/).error(new Error("تصویر ارسال شده صحیح نمیباشد")),
    fileUploadPath: Joi.allow()
})

module.exports={
    createProductSchema
}