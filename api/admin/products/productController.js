const product = require("./productModel")

async function addProduct(req, res) {
    let formdata = req.body
    let validations = []
    let { name, supplier, category, ingredients } = formdata
    if (!name) {
        validations.push("name")
    }
    if (!supplier) {
        validations.push('supplier')
    }
    if (!ingredients) {
        validations.push("ingredeints")
    }
    if (!category) {
        validations.push("category")
    }
    if (validations.length > 0) {
        res.send({
            success: false,
            status: 400,
            message: validations.join('+') + "required"
        })
    } else {
        let exitisingProduct = await product.findOne({ name: formdata.name ,isDeleted:false})
        if (!!exitisingProduct) {
            res.send({
                success: false,
                status: 400,
                message: "product already exists"
            })
        } else {
            let total = await product.countDocuments({ isDeleted: false })
            let productObj = new product()
            productObj.autoId = total + 1
            let existingProduct =await product.findOne({name:formdata.name})
            if(!!existingProduct){
                res.send({
                    success:false,
                    status:400,
                    message:"product already exits"
                })
            }else{
                productObj.name = formdata.name
            }
            productObj.supplierId = formdata.supplier
            productObj.categoryId = formdata.category
            productObj.quantity = formdata.quantity
            productObj.ingredients = formdata.ingredients
            productObj.save().then((item) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "product added successfully",
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
}

function allProduct(req, res) {
    product.find({ isDeleted: false }).populate("supplierId").populate("categoryId").sort({createdAt:-1}).then((item) => {
        res.send({
            success: true,
            status: 200,
            message: "All products loaded successfully",
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

function singleProduct(req, res) {
    product.findOne({ _id: req.body._id, isDeleted: false }).populate("supplierId").populate('categoryId').then((item) => {
        if (!item) {
            res.send({
                success: false,
                status: 404,
                message: "Product doesn't exits"
            })
        } else {
            res.send({
                success: true,
                status: 200,
                message: " product loaded successfully",
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

function deleteProduct(req, res) {
    product.findById({ _id: req.body._id }).then((item) => {
        if (!item) {
            res.send({
                success: false,
                status: 404,
                message: "Product doesn't exits"
            })
        } else {
            item.isDeleted = true
            item.save().then((item) => {
                res.send({
                    success: true,
                    status: 200,
                    message: " product Deleted successfully",
                    data: item
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

function updateProduct(req, res) {
    let formdata = req.body
    product.findById({ _id: formdata._id }).then((item) => {
        if (!item) {
            res.send({
                success: false,
                status: 404,
                message: "Product doesn't exits"
            })
        } else {
            if (!!formdata.name) item.name = formdata.name
            if (!!formdata.supplier) item.supplierId = formdata.supplier
            if (!!formdata.category) item.categoryId = formdata.category
            if (!!formdata.quantity) item.quantity = formdata.quantity
            if (!!formdata.ingredients) item.ingredients = formdata.ingredients
            item.save().then((item) => {
                res.send({
                    success: true,
                    status: 200,
                    message: " product updated  successfully",
                    data: item
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


function searchProduct(req,res){
    product.find({
        $or:[
            {name:{$regex:req.body.key}},
            {ingredients:{$regex:req.body.key}},
        ]
    }).populate("categoryId").populate("supplierId").then((item)=>{
        if(item.length==0){
            res.send({
                success:false,
                status:404,
                message:"Product doesn't exists"
            })
        }else{
            res.send({
                success:true,
                status:200,
                message:"Search done",
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

module.exports = { addProduct, allProduct, singleProduct, deleteProduct, updateProduct ,searchProduct}