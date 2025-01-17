const { PermissionsModel } = require("../../models/permissions")
const { PERMISSIONS } = require("../../utils/constanse")
const {StatusCodes:HttpStatus}=require("http-status-codes")
const createError=require("http-errors");



function checkPermission(requiredPermissions){
    return async function(req, res, next){
     try {
        const allPermissions= requiredPermissions.flat(2)
        const user=req.user
        const role=await PermissionsModel.find({title: user.Role})
        const permissions=await PermissionsModel.find({_id: {$in: role.permissions}})
        const userPermissions=permissions.map(item=> item.name)
        const hasPermission=allPermissions.every(permission=>{
            return userPermissions.includes(permission)
        })
        if(userPermissions.includes(PERMISSIONS.ALL)) return next()
        if(allPermissions .length==0 || hasPermission) return next()
        throw createError.Forbidden("شما به این صفحه دسترسی ندارید")
     } catch (error) {
        next(error)
     }
    }
}

module.exports={
    checkPermission
}