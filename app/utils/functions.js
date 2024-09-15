const JWT=require("jsonwebtoken")
const createError=require("http-errors")
const { UserModel } = require("../models/user")
const {  ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constanse")
const fs=require("fs")
const path=require("path")
// const redisClient=require("./init_redis")


function RandomNumberGenerator(){
    return Math.floor((Math.random() * 9000)+ 10000)
}

function SignAccessToken(userId){
    return new Promise(async(resolve, reject)=>{
        const user=await UserModel.findById(userId)
        const payload={
            mobile: user.mobile,
            userId: user._id
        }
        const secret=ACCESS_TOKEN_SECRET_KEY
        const options={
            expiresIn: "1y"
        }
        JWT.sign(payload,secret,options,(err, token)=>{
            if(err) reject (createError.InternalServerError("خطای سروری"))
            resolve(token)
        })

    })

}
function SignRefreshToken(userId){
    return new Promise(async(resolve, reject)=>{
        const user=await UserModel.findById(userId)
        const payload={
            mobile: user.mobile,
        }
        const secret=REFRESH_TOKEN_SECRET_KEY
        const options={
            expiresIn: "1y"
        }
        JWT.sign(payload,secret,options,async(err, token)=>{
            if(err) reject (createError.InternalServerError("خطای سروری"))
              resolve(token)
        })

    })

}
function VerifyRefreshToken(token){
    return new Promise((resolve, reject)=>{
        JWT.verify(token, REFRESH_TOKEN_SECRET_KEY,async(err, payload)=>{
            if(err) reject(createError.Unauthorized("وارد حساب کاربری خود شوید"))
            const {mobile}=payload || {}
            const user=await UserModel.findOne({mobile}, {password:0, otp:0})
            if(!user) reject(createError.Unauthorized("حساب کاربری یافت نشد")) 
            // const refreshToken=await redisClient.get(user._id || "key_default")
            // if(token===refreshToken) return resolve(mobile)
            // if(!refreshToken) reject (createError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد"))
            resolve(mobile)
        })
    })
}

function deleteFileInPublic(fileAddress){
    if(fileAddress){
        const pathFile=path.join(__dirname,"..","..","public", fileAddress)
        if(fs.existsSync(pathFile)) fs.unlinkSync(pathFile)
    }
}

function ListOfImagesFromRequest(files, fileUploadPath){
    if(files?.length > 0 ){
        return ((files.map(file=>path.join(fileUploadPath, file.filename))).map(item=> item.replace(/\\/g,"/")))
    }else{
        return []
    }
}
function copyObject(object){
    return JSON.parse(JSON.stringify(object))
}
function setFeatures(body){
    const {height, weight, width, length}=body
    let feature={}
    if(!isNaN(+width) || !isNaN(+weight) || !isNaN(+height) || !isNaN(+length)){
        if(!width) feature.width=0 
        else feature.width=+width
        if(!height) feature.height=0
        else feature.height=+height
        if(!weight) feature.weight=0
        else feature.weight=+weight
        if(!length) feature.length=0
        else feature.length=+length
    }
    return feature
}
function deleteInvalidPropertyInObject(data={},blackList=[]){
    let nullishData=["", " ", null, "0", undefined]
    Object.keys(data).forEach(key=>{
        if(blackList.includes(key)) delete data[key]
        if(typeof data[key] =="string") data[key]= data[key].trim()
        if(Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item=>item.trim())
            if(Array.isArray(data[key]) && data[key].length == 0) delete data[key] 
        if(nullishData.includes(data[key])) delete data[key]
    })
}
function getDuration(control) {
    var video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = function () {
        window.URL.revokeObjectURL(video.src);

        console.log("Duration : " + video.duration + " seconds");
        console.log(getTime(video.duration));
    }
    video.src = URL.createObjectURL(control.files[0]);
}

function getTime(seconds) {
    let total = Math.round(seconds) / 60;
    let [min, percent] = String(total).split(".");
    let sec = Math.round((percent * 60) / 100).toString().substring(0,2);
    let hour = 0;
    if (min > 60) {
      total = min / 60;
      let [h1 , m1] = String(total).split(".")
      hour=h1,
      min = Math.round((m1*60) / 100).toString().substring(0,2);
    }
    return (hour + ":" + min + ":" + sec)
  }

function calculateDiscount(price, discount){
    return Number(price) - ((Number(discount)/ 100) * Number(price))
}
async function getBasketOfUser(userID){
    const userDetail= await UserModel.aggregate([
        {
            $match:{_id :userID}
        },
        {
            $project:{basket:1}
        },
        {
            $lookup:{
                from: "products",
                localField:"basket.products.productID",
                foreignField:"_id",
                as:"productDetail"
            }
        },
        {
            $addFields:{
                "productDetail":{
                    $function:{
                        body : function(productDetail, products){
                            return productDetail.map(function(product){
                                const count=products.find(item=> item.productID.valueOf() == product._id.valueOf()).count;
                                const totalPrice=count * product.price;
                                return{
                                    ...product,
                                    basketCount: count,
                                    totalPrice,
                                    finalPrice: totalPrice - ((product.discount / 100) * totalPrice)
                                }
                            })
                        },
                        args:["$productDetail", "$basket.products"],
                        lang: "js"
                    }
                },
                "payDetail":{
                    $function:{
                        body : function(productDetail, products){
                            const productAmount=productDetail.reduce(function(total, product){
                                const count= products.find(item=>item.productID.valueOf() == product._id.valueOf()).count
                                const totalPrice= count * product.price
                                return total + (totalPrice -((product.discount / 100) * totalPrice))
                            }, 0)
                            const productIds= productDetail.map(product=> product._id.valueOf())
                            return {
                                productAmount, 
                                paymentAmount: productAmount
                            }
                        },
                        args:["$productDetail", "$basket.products"],
                        lang: "js"
                    }
                },
                
            }
        },
        {
            $project:{
                basket:0
            }
        }
    ])
    return copyObject(userDetail)
}
async function invoiceNumberGenerator(){
    return moment().format("jYYYYjMMjDDHHmmssSSS") +  String(process.hrtime()[1]).padStart(9,0)
}

module.exports={
    RandomNumberGenerator,
    SignAccessToken,
    SignRefreshToken,
    deleteFileInPublic,
    VerifyRefreshToken,
    ListOfImagesFromRequest,
    copyObject,
    getTime,
    setFeatures,
    deleteInvalidPropertyInObject,
    getDuration,
    calculateDiscount,
    getBasketOfUser,
    invoiceNumberGenerator
}