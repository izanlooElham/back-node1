const Joi=require("@hapi/joi")
const createHttpError=require("http-errors")
const { MONGO_ID_PATTERN } = require("../../utils/constanse")

const ObjectIdValidator=Joi.object({
    id: Joi.string().pattern(MONGO_ID_PATTERN).error(new Error(createHttpError.BadRequest("شناسه وارد شده صحیح نمیباشد")))
})

module.exports={
    ObjectIdValidator
}