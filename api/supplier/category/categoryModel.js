const mongo=require("mongoose")
const categorySchema=mongo.Schema({
    autoId:{type:Number,default:0},
    name:{type:String,default:""},
    isDeleted:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now()}
})

module.exports=mongo.model("category",categorySchema)