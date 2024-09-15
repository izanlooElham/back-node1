const Joi=require("@hapi/joi")

const getOTPSchema=Joi.object({
    mobile:Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل وارد شده صحیح نمیباشد")),
})
const checkOTPSchema=Joi.object({
    mobile:Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل وارد شده صحیح نمیباشد")),
    code:Joi.string().min(4).max(6).error(new Error("کد ارسال شده صحیح نمیباشد")),
})

module.exports={
    getOTPSchema,
    checkOTPSchema
}