const express = require("express")
const app=express()
const port=4000
const cors=require("cors")
app.use(express.urlencoded())
app.use(express.json())
app.use(cors())
const userRouter=require("./Routes/user")
const adminRouter=require("./Routes/admin")
app.use("/api",userRouter)
app.use("/admin",adminRouter)
require("./config/db")



    






app.listen(port,()=>{
    console.log('server is running')
})

