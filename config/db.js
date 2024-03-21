const mongo=require("mongoose")
mongo.connect("mongodb+srv://fsatoperson1:person1fsato@cluster0.iwiglg2.mongodb.net/sufaan").then(()=>{
        console.log("database is running successfully")
}).catch((err)=>{
    console.log("error"+err)
})