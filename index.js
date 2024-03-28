const express = require("express")
require("dotenv").config()
const app=express()
const port= process.env.PORT|| 4000
app.use(express.urlencoded())
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from http://localhost:3001
    methods: ['GET', 'POST','PUT','DELETE'], // Allow only specified methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow only specified headers
  }))
const userRouter=require("./Routes/user")
const adminRouter=require("./Routes/admin")
app.use("/api",userRouter)
app.use("/admin",adminRouter)
require("./config/db")

app.listen(port,()=>{
    console.log(`server is running${port}`)
})

