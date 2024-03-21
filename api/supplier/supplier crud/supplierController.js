const supplier= require("./supplierModel")

async function addsupplier(req,res){
    let formdata=req.body
    let validations=[]
    let {name,contact,address}=formdata
    if(!name){
        validations.push("name")
    }
    if(!contact){
        validations.push("contact")
    }
    if(!address){
        validations.push('address')
    }
    if(validations.length>0){
        res.send({
            success:false,
            status:400,
            message:validations.join("+")+"required"
        })
    }else{
        let total= await supplier.countDocuments({isDeleted:false})
        let supplierObj=new supplier()
        supplierObj.autoId=total+1
        supplierObj.name=formdata.name
        supplierObj.contact=formdata.contact
        supplierObj.address=formdata.address
        supplierObj.save().then((item)=>{
            res.send({
                success:true,
                status:200,
                message:"Supplier added successfully",
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

function allsupplier(req,res){
    supplier.find({isDeleted:false}).then((item)=>{
        res.send({
            success:true,
            status:200,
            message:"All data loaded successfully",
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

function singleSupplier(req,res){
    supplier.findOne({_id:req.body._id}).then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message:"Supplier doesn't exists"
            })  
        }else{
            res.send({
                success:true,
                status:200,
                message:"All data loaded successfully",
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


function deleteSupplier(req,res){
    supplier.findById({_id:req.body._id, isDeleted:false}).then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message:"Supplier doesn't exists"
            })  
        }else{
            item.isDeleted=true
            item.save().then(()=>{
                res.send({
                    success:true,
                    status:200,
                    message:"Supplier deleted successfully"
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


function updateSupplier(req,res){
    let formdata=req.body
    supplier.findById({_id:req.body._id}).then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message:"Supplier doesn't exists"
            }) 
        }else{
            if(!!formdata.name) item.name=formdata.name
            if(!!formdata.contact) item.contact=formdata.contact
            if(!!formdata.address) item.address=formdata.address
            item.save().then((result)=>{
                res.send({
                    success:true,
                    status:200,
                    message:"Supplier updated  successfully",
                    data:result
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


function searchSupplier(req,res){
    supplier.find({
        $or:[
            {name:{$regex:req.body.key}},
            {address:{$regex:req.body.key}}
        ]
    ,isDeleted:false}).then((item)=>{
        if(item.length===0){
            res.send({
                success:false,
                status:404,
                message:"Doesn't Exists"
            })
         }else{
            res.send({
                success:true,
                status:200,
                message:"Found",
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


module.exports={addsupplier,allsupplier,singleSupplier,deleteSupplier,updateSupplier,searchSupplier}