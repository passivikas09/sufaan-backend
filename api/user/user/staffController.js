const staff = require('./staffModel')
const bcrypt = require("bcrypt")
const salt = 10
async function addstaff(req, res) {
    let formdata = req.body
    let validations = []
    let { name, password, contact, address } = formdata
    if (!name) {
        validations.push("name")
    }
    if (!password) {
        validations.push("password")
    }
    if (!contact) {
        validations.push('contact')
    }
    if (!address) {
        validations.push("adress")
    }
    if (validations.length > 0) {
        res.send({
            success: false,
            status: 400,
            message: validations.join("+") + "required"
        })
    } else {
        let total = await staff.countDocuments({ isDeleted: false })
        let staffObj = new staff()
        staffObj.autoId = total + 1
        staffObj.name = formdata.name
        let encrpytpwd = bcrypt.hashSync(formdata.password, salt)
        staffObj.password = encrpytpwd
        staffObj.address = formdata.address
        staffObj.contact = formdata.contact
        staffObj.save().then((item) => {
            res.send({
                success: true,
                status: 200,
                message: "staff added successfully",
                data: item
            })
        }).catch((err) => {
            res.send({
                success: false,
                status: 500,
                message: "error:" + err,
            })
        })
    }
}

//all staff

function allstaff(req, res) {
    staff.find({ isDeleted: false }).then((item) => {
        if (!item) {
            res.send({
                success: false,
                status: 400,
                message: "Something went wrong!!",
            })
        } else {
            res.send({
                success: true,
                status: 200,
                message: "All staff Loaded Successfully",
                data: item
            })
        }
    }).catch((err) => {
        res.send({
            success: false,
            status: 500,
            message: "error:" + err,
        })
    })
}


function singlestaff(req, res) {
    staff.findOne({ _id: req.body._id }).then((item) => {
        if (!item) {
            res.send({
                success: false,
                status: 404,
                message: "staff doesn't exists",
            })
        } else {
            res.send({
                success: true,
                status: 200,
                message: "All staff Loaded Successfully",
                data: item
            })
        }
    }).catch((err) => {
        res.send({
            success: false,
            status: 500,
            message: "error:" + err,
        })
    })
}

function deletestaff(req, res) {
    staff.findOne({ _id: req.body._id }).then((item) => {
        if (!item) {
            res.send({
                success: false,
                status: 404,
                message: "staff doesnot existed",
            })
        } else {
            item.isDeleted = true
            item.save().then((result) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "staff Deleted Successfully",
                    data: result
                })
            }).catch((err) => {
                res.send({
                    success: false,
                    status: 400,
                    message: "error:" + err,
                })
            })
        }
    }).catch((err) => {
        res.send({
            success: false,
            status: 500,
            message: "error:" + err,
        })
    })
}

function updatestaff(req, res) {
    let formdata = req.body
    staff.findOne({ _id: formdata._id }).then((item) => {
        if (!item) {
            res.send({
                success: false,
                status: 404,
                message: "staff doesnot existed",
            })
        } else {
            if (!!formdata.name) item.name = formdata.name
            if (!!formdata.password) item.password = formdata.password
            if (!!formdata.address) item.address = formdata.address
            if (!!formdata.contact) item.contact = formdata.contact
            item.save().then((result) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "staff updated successfully",
                    data: result
                })
            }).catch((err) => {
                res.send({
                    success: false,
                    status: 400,
                    message: "erorr:" + err,
                })
            })
        }
    }).catch((err) => {
        res.send({
            success: false,
            status: 500,
            message: "error:" + err,
        })
    })
}


function forgotpwd(req, res) {
    let salt = 10
    let formdata = req.body
    let validations = []
    let { newpassword, repassword } = formdata
    if (!newpassword) {
        validations.push("new password ")
    }
    if (!repassword) {
        validations.push("re-enter password ")
    }
    if (validations.length > 0) {
        res.send({
            success: false,
            status: 400,
            message: validations.join("+")
        })
    } else {
        staff.findOne({ _id: formdata._id }).then((item) => {
            if (!item) {
                res.send({
                    success: false,
                    status: 404,
                    message: "staff not found"
                })
            } else {
                let encrpytpwd = bcrypt.hashSync(formdata.newpassword, salt)
                item.password = encrpytpwd
                if (formdata.newpassword != formdata.repassword) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "Password doesn't match"
                    })
                } else {
                    item.save().then((result) => {
                        res.send({
                            success: true,
                            status: 200,
                            message: "Password changed successfully",
                            data: result
                        })
                    }).catch((err) => {
                        res.send({
                            success: false,
                            status: 400,
                            message: "Erorr" + err
                        })
                    })
                }
            }
        }).catch((err) => {
            res.send({
                success: false,
                status: 500,
                message: "Error" + err
            })
        })
    }
}


function searchStaff(req,res){
    staff.find({
        $or:[
            {name:{$regex:req.body.key}},
            {addres:{$regex:req.body.key}}
        ]
    ,isDeleted:false}).then((item)=>{
        if(item.length==0){
            res.send({
                success:false,
                status:404,
                message:"Employee Doesn't exists"
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
            success: false,
            status: 500,
            message: "Error" + err
        })
    })
}
module.exports = { addstaff, allstaff, singlestaff, deletestaff, updatestaff, forgotpwd ,searchStaff}