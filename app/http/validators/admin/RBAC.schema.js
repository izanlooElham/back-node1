const Joi=require("@hapi/joi")
const { MONGO_ID_PATTERN } = require("../../../utils/constanse")

const addRoleSchema=Joi.object({
    title:Joi.string().min(3).max(30).error(new Error("عنوان نقش صحیح نمیباشد")),
    description:Joi.string().min(3).max(30).error(new Error("توضیحات نقش صحیح نمیباشد")),
    permissions:Joi.array().items(Joi.string().pattern(MONGO_ID_PATTERN)).error(new Error("سطوح دسترسی های ارسال شده صحیح نمیباشد"))
})
const addPermissionSchema=Joi.object({
    name:Joi.string().min(3).max(30).error(new Error("اسم نقش صحیح نمیباشد")),
    description:Joi.string().min(0).max(100).error(new Error(" توضیحات دسترسی صحیح نمیباشد")),
})




module.exports={
   addRoleSchema,
   addPermissionSchema
}