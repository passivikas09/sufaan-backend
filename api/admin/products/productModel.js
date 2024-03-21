const mongo =require("mongoose")
const objectId=mongo.Types.ObjectId
const productSchema=mongo.Schema({
    autoId:{type:Number,default:0},
    name:{type:String,default:""},
    quantity:{type:Number,default:0},
    ingredients:{type:String,default:""},
    categoryId:{type:objectId,default:null,ref:"category"},
    supplierId:{type:objectId,default:null,ref:"supplier"},
    isDeleted:{type:Boolean,default:false},
    createdAt:{type:Date ,default:Date.now()}
})
module.exports=mongo.model("product",productSchema)