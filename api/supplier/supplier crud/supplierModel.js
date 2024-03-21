const mongo=require('mongoose')
const supplierSchema=mongo.Schema({
    autoId:{type:Number,default:0},
    name:{type:String,default:""},
    address:{type:String,default:""},
    contact:{type:Number,default:0},
    isDeleted:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now()}
})

module.exports=mongo.model("supplier",supplierSchema)