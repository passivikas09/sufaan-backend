const staff= require("../user/staffModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()
function login(req,res){
    let formdata=req.body
    let validations=[]
    let {name ,password}=formdata
    if(!name){
        validations.push("username")
    }
    if(!password){
        validations.push("password")
    }
    if(validations.length>0){
        res.send({
            success:false,
            status:400,
            message:validations.join("+")+"required"
        })
    }else{
        staff.findOne({name:req.body.name}).then(async (item)=>{
            if(!item){
                res.send({
                    success:false,
                    status:404,
                    message:"user doesn't exits"
                })
            }else{
                let hashedpwd= bcrypt.compareSync(formdata.password,item.password)
                let payload={name:formdata.name,password:formdata.password}
                let token =jwt.sign(payload,process.env.SECRETKEY)
                if(!hashedpwd){
                    res.send({
                        success:false,
                        status:400,
                        message:"invalid credentials"
                    })
                }else{
                    res.send({
                        success:true,
                        status:200,
                        message:"Login successfully",
                        data:item,
                        token:token
                    })
                }
            }
        }).catch(()=>{
            res.send({
                success: false,
                status: 500,
                message: "error:" + err,
            })
        })
    }
}
module.exports={login}