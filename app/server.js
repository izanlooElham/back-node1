const express=require("express")
const {default: mongoose}=require("mongoose")
const path=require("path")
const {StatusCodes:HttpStatus}=require("http-status-codes")
const morgan = require("morgan")
const { AllRoutes } = require("./router/routes")
const swaggerUi=require("swagger-ui-express")
const swaggerJsDoc=require("swagger-jsdoc")
const cors=require("cors")
require("dotenv").config()

module.exports = class Application{
    #app = express()
    #DB_URL
    #PORT
    constructor(PORT,DB_URI){
        this.#PORT=PORT
        this.#DB_URL=DB_URI
        this.configApplication()
        this.connectToMongoDB()
        this.initRedis()
        this.createServer()
        this.createRoutes()
        this.errorHandleing()

    }
    configApplication(){
        this.#app.use(cors())
        this.#app.use(morgan("dev"))
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({extended: true}))
        this.#app.use(express.static(path.join(__dirname,"..","public")))
        this.#app.use("/rezqorazeq-swagger", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc({
            swaggerDefinition:{
                openapi: "3.0.0",
                info:{
                    title: "Rezqorazeq",
                    version:"1.0.0",
                    description:"بزرگترین مرجع فروش محصولات ارگانیک در ایران",
                    contact:{
                        name: "Elham izanloo",
                        email:"izanlooelham2@gmail.com"
                    }
                },
                servers:[
                    {
                        url: "http://localhost:4000"
                    }
                ],
                components: {
                    securitySchemes:{
                        BearerAuth:{
                            type: "http",
                            scheme: "bearer",
                            bearerFormat: "JWT"
                        }
                    }
                },
                security:[{BearerAuth:[]}]
            },
            apis:["./app/router/**/*.js"]
        }), {explorer:true}))

    }
    createServer(){
        const http=require("http")
        http.createServer(this.#app).listen(this.#PORT,()=>{
            console.log("run > http://localhost:" + this.#PORT)
        })
    }
    createRoutes(){
        this.#app.use(AllRoutes)
    }
    connectToMongoDB(){
        mongoose.connect(this.#DB_URL).then(()=>{
            console.log("connected to DB")

            mongoose.connection.on("connected",()=>{
                console.log("mongoose connected to DB")
            })
            mongoose.connection.on("disconnected",()=>{
                console.log("mongoose connection is disconnected")
            })
            process.on("SIGINT", async()=>{
                await mongoose.connection.close()
                console.log("disconnected")
                process.exit(0)
            })
        }).catch((err)=>{
            console.log(err?.message ?? "failed DB connection")
        })
    
    }
    initRedis(){
        require("./utils/init_redis")
    }
    errorHandleing(){
        // no url
        this.#app.use((req,res,next)=>{
            return res.status(HttpStatus.NOT_FOUND).json({
                statusCode: HttpStatus.NOT_FOUND,
                message:"آدرس مورد نظر یافت نشد"
            })
        })
        // another errors
        this.#app.use((error, req, res, next)=>{
            const statusCode= error.status || HttpStatus.INTERNAL_SERVER_ERROR
            const message= error.message || "InternalServerError"
            return res.status(statusCode).json({
                statusCode,
                message
            })
        })
    }
}

