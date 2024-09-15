const redisDB=require("redis")
const redisClient=redisDB.createClient({
    host: "127.0.0.1",
    port: 6379,
})
redisClient.connect()
redisClient.on("connect", ()=> console.log("connect to redisDB"))
redisClient.on("error",(err)=> console.log("redisError :", err.message))
redisClient.on("ready",()=> console.log("redis connected and ready to use"))
redisClient.on("end", ()=> console.log("disconnected to redis"))

module.exports=redisClient