const mongo=require("mongoose")
require("dotenv").config()
mongo.connect(process.env.SERVER).then(()=>{
        console.log("database is running successfully")
}).catch((err)=>{
    console.log("error"+err)
})