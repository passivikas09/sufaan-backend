const mongo=require("mongoose")
const ObjectID=mongo.Types.ObjectId
const dispatchSchema= mongo.Schema({
    autoId:{type:Number,default:""},
    name:{type:String,default:""},
    product:{type:ObjectID,default:null,ref:"product"},
    noofLabels:{type:Number,default:0},
    status:{type:Number ,default:0},//pending :0 , shipped :1 , delivered:2
    isDeleted:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now()}
})
module.exports=mongo.model("dispatch",dispatchSchema)