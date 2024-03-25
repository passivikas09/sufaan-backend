const dispatch=require("./dispatcModel")

async function addDispatch(req,res){
    let formdata=req.body
    let validations=[]
    let {name,productId,noofLabels}=formdata
    if(!name){
        validations.push("name")
    }
    if(!productId){
        validations.push("productId")
    }
    if(!noofLabels){
        validations.push("no of labels")
    }
    if(validations.length>0){
        res.send({
            success:false,
            status:400,
            message:validations.join("+")+"required"
        })
    }else{
        let total =await dispatch.countDocuments({isDeleted:false})
        let dispatchObj=new dispatch()
        dispatchObj.autoId=total+1
        dispatchObj.name=formdata.name
        dispatchObj.productId=formdata.productId
        dispatchObj.noofLabels=formdata.noofLabels
        dispatchObj.status=formdata.status
        dispatchObj.save().then((item)=>{
            res.send({
                success:true,
                status:200,
                message:"placed successfully",
                data:item
            })
        }).catch((err)=>{
            res.send({
                success:false,
                status:500,
                message:"error"+err
            })
        })
    }
}

function allDispatch(req,res){
    dispatch.find({isDeleted:false}).populate("productId").then((item)=>{
        res.send({
            success:true,
            status:200,
            message:"All loaded successfully",
            data:item
        })
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"error"+err
        })
    })
}

function singleDispatch(req,res){
    let formdata=req.body
    dispatch.findById({_id:formdata._id,isDeleted:false}).populate("productId").then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message:"Doesn't exits",
            })
        }else{
            res.send({
                success:true,
                status:200,
                message:"All loaded successfully",
                data:item
            })
        }
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"error"+err
        })
    })
}

function deleteDispatch(req,res){
    let formdata=req.body
    dispatch.findById({_id:formdata._id,isDeleted:false}).then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message:"Item doesn't exits",
            })
        }else{
            item.isDeleted=true
            item.save().then((data)=>{
                res.send({
                    success:true,
                    status:200,
                    message:"Item deleted  successfully",
                    data:data
                })
            }).catch((err)=>{
                res.send({
                    success:false,
                    status:400,
                    message:"error"+err
                })
            })
        }
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"error"+err
        })
    })
}


function updateDispatch(req,res){
    let formdata=req.body
    dispatch.findOne({_id:formdata._id}).then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message:"item doesn't exits"
            })
        }else{
              if(!!formdata.name) item.name=formdata.name 
              if(!!formdata.productId) item.productId=formdata.productId
              if(!!formdata.noofLabels) item.noofLabels=formdata.noofLabels
              if(!!formdata.status) item.status=formdata.status
              item.save().then((data)=>{
                res.send({
                    success:true,
                    status:200,
                    message:"Item updated successfully",
                    data:data
                })
              }).catch((err)=>{
                res.send({
                    success:false,
                    status:500,
                    message:"error"+err
                })
              }) 
        }
    })
}

module.exports={addDispatch,allDispatch,singleDispatch,deleteDispatch,updateDispatch}