const label = require("./labelModel")
async function generateLabel(req, res) {
    let formdata = req.body
    let validations = []
    let { productName, quantity, noofLabels, codeward } = formdata
    if (!productName) {
        validations.push("product Name")
    }
    if (!quantity) {
        validations.push("quantity")
    }
    if (!codeward) {
        validations.push("code")
    }
    if (!noofLabels) {      
        validations.push("number of labels")
    }
    if (validations.length > 0) {
        res.send({
            success: false,
            status: 400,
            message: validations.join('+') + 'required'
        })
    } else {
        let total = await label.countDocuments({ isDeleted: false })
        let labelObj = new label()
        labelObj.autoId = total + 1
        labelObj.productName=formdata.productName      
        labelObj.noofLabels =formdata.noofLabels
        labelObj.quantity = formdata.quantity
        let existingcode= await label.findOne({code:formdata.codeward})
        if(!!existingcode){
            res.send({
                success:false,
                status:400,
                message:"code is already exits"
            })
        }else{ 
            labelObj.code = formdata.codeward
            let labelvalue = formdata.codeward
            for (let i = 0; i < formdata.noofLabels; i++) {
               labelObj.products.push({codeward:labelvalue})
           }
        }
        labelObj.save().then((item) => {
            res.send({
                success: true,
                status: 200,
                message: "generated",
                data: item
            })
        }).catch((err) => {
            res.send({
                success: false,
                status: 500,
                message: "Error" + err
            })
        })
    }
}

function searchLabel(req,res){
     label.find({
        $or:[
            {code:{$regex:req.body.key}},
            {productName:{$regex:req.body.key}}     
        ]
     }).then((item)=>{
        if(item.length===0){
            res.send({
                success:false,
                status:404, 
                message:'label doesnt exists'
            })
        }else{
            res.send({
                success:true,
                message:"search done",
                data:item
            })
        }
     }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"Error"+err
        })
     })  
}

function AllLabel(req, res) {
    label.find({ isDeleted: false }).sort({createdAt:-1}).then((item) => {
        res.send({
            success: true,
            status: 200,
            message: "All loaded successfully",
            data: item
        })
    }).catch((err) => {
        res.send({
            success: false,
            status: 500,
            message: "Error" + err
        })
    })
}

function SingleLabel(req, res) {
    label.findOne({ _id: req.body._id, isDeleted: false }).then((item) => {
        if (!item) {
            res.send({
                success: false,
                status: 404,
                message: "Item Does't exits"
            })
        } else {
            res.send({
                success: true,
                status: 200,
                message: "Item  loaded successfully",
                data: item
            })
        }
    }).catch((err) => {
        res.send({
            success: false,
            status: 500,
            message: "Error" + err
        })
    })
}


function deleteLabel(req, res) {
    label.deleteOne({ _id: req.body._id, isDeleted: false }).then((item) => {
        if (!item) {
            res.send({
                success: false,
                status: 404,
                message: "Item Does't exits"
            })
        } else {
            res.send({
                success:true,
                status:200,
                message:"Label Deleted successfully",
                data:item
            })
        }
    }).catch((err) => {
        res.send({
            success: false,
            status: 500,
            message: "Error" + err
        })
    })
}

function updateLabel(req, res) {
    let formdata = req.body
    label.findOne({ _id: req.body._id, isDeleted: false }).then((item) => {
        if (!item) {
            res.send({
                success: false,
                status: 404,
                message: "Item Does't exits"
            })
        } else {
            if (!!formdata.productName) item.productName = formdata.productName
            if (!!formdata.quantity) item.quantity = formdata.quantity
            if (!!formdata.useBy) item.useBy = formdata.useBy
            if (!!formdata.noofLabels) item.noofLabels = formdata.noofLabels
            if (!!formdata.code) item.code = formdata.code
            item.save().then((result) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "Updated successfully",
                    data: result
                })
            }).catch((err) => {
                res.send({
                    success: false,
                    status: 400,
                    message: "Error" + err
                })
            })
        }
    }).catch((err) => {
        res.send({
            success: false,
            status: 500,
            message: "Error" + err
        })
    })
}


module.exports = { generateLabel, AllLabel, SingleLabel, deleteLabel, updateLabel ,searchLabel}