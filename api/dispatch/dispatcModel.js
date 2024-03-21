const mongo=require("mongoose")
const ObjectID=mongo.Types.ObjectId
const dispatchSchema= mongo.Schema({
    autoId:{type:Number,default:""},
    name:{type:String,default:""},
    categoryId:{type:ObjectID,default:null,ref:"category"},
    quantity:{type:Number,default:0},
    status:{type:Number ,default:0},
    isDeleted:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now()}
})
module.exports=mongo.model("dispatch",dispatchSchema)