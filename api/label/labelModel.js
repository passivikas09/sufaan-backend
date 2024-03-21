const mongo=require("mongoose")
const labelSchema=mongo.Schema({
    autoId:{type:Number,default:0},
    productName:{type:String,default:""},
    products:[{
       codeward:{type:String,default:""}
    }],
    code:{type:String,default:""},
    quantity:{type:Number,default:0},
    noofLabels:{type:Number,default:0},
    isDeleted:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now()}    
})
module.exports=mongo.model('label',labelSchema)