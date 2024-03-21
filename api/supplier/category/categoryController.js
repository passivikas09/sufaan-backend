const category = require("./categoryModel")

async function addCategory(req, res) {
    let formdata = req.body
    let validations = []
    let { name } = formdata
    if (!name) {
        validations.push("name")
    }
    if (validations.length > 0) {
        res.send({
            success: false,
            status: 400,
            message: validations.join('+') + "required"
        })
    } else {
        let exitisingCategory = await category.findOne({ name: formdata.name ,isDeleted:false })
        if (!!exitisingCategory) {
            res.send({
                success: false,
                status: 400,
                message: " category already exits"
            })
        } else {
            let total = await category.countDocuments({ isDeleted: false })
            let categoryObj = new category()
            categoryObj.autoId = total + 1
            categoryObj.name = formdata.name
            categoryObj.save().then((item) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "category added successfully",
                    data: item
                })
            }).catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: 'error' + err
                })
            })
        }
    }
}

function allCategory(req, res) {
    category.find({ isDeleted: false }).then((item) => {
        res.send({
            success: true,
            status: 200,
            message: "All category loaded successfully",
            data: item
        })
    }).catch((err) => {
        res.send({
            success: false,
            status: 500,
            message: 'error' + err
        })
    })
}


function singleCategory(req, res) {
    category.findById({ _id: req.body._id }).then((item) => {
        if (!item) {
            res.send({
                success: false,
                status: 404,
                message: 'category doesnt exists'
            })
        } else {
            res.send({
                success: true,
                status: 200,
                message: "category loaded successfully",
                data: item
            })
        }
    }).catch((err) => {
        res.send({
            success: false,
            status: 500,
            message: 'error' + err
        })
    })
}

function deleteCategory(req, res) {
    category.findById({ _id: req.body._id }).then((item) => {
        if (!item) {
            res.send({
                success: false,
                status: 404,
                message: 'category doesnt exists'
            })
        } else {
            item.isDeleted = true
            item.save().then((result) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "category Deleted successfully",
                    data: result
                })
            }).catch((err) => {
                res.send({
                    success: false,
                    status: 400,
                    message: 'error' + err
                })
            })
        }
    }).catch((err) => {
        res.send({
            success: false,
            status: 500,
            message: 'error' + err
        })
    })
}

function updateCategory(req, res) {
    let formdata = req.body
    category.findById({ _id: formdata._id }).then((item) => {
        if (!item) {
            res.send({
                success: false,
                status: 404,
                message: 'category doesnt exists'
            })
        } else {
            if (!!formdata.name) item.name = formdata.name
            item.save().then((result) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "category Updated successfully",
                    data: result
                })
            }).catch((err) => {
                res.send({
                    success: false,
                    status: 400,
                    message: 'error' + err
                })
            })
        }
    }).catch((err) => {
        res.send({
            success: false,
            status: 500,
            message: 'error' + err
        })
    })
}

function searchCategory(req,res){
    category.find({
        $or:[
            {name:{$regex:req.body.key}}
        ]
    ,isDeleted:false}).then((item)=>{
        if(item.length==0){
            res.send({
                success:false,
                status:404,
                message:"Doesn;t exists"
            })
        }else{
            res.send({
                success:true,
                status:200,
                message:"found something",
                data:item
            })
        }
    }).catch((err)=>{
        res.send({
            success: false,
            status: 500,
            message: 'error' + err
        })
    })
}

module.exports = { addCategory, allCategory, singleCategory, deleteCategory, updateCategory ,searchCategory}