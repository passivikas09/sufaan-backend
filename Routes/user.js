const userRouter= require("express").Router()
const staff= require("../api/user/user/staffController")
const login=require("../api/user/login/login")
userRouter.post("/staff/add",staff.addstaff)
userRouter.get("/staff/all",staff.allstaff)
userRouter.post("/staff/single",staff.singlestaff)
userRouter.put("/staff/update",staff.updatestaff)
userRouter.post("/staff/delete",staff.deletestaff)
userRouter.post("/staff/forgotpassword",staff.forgotpwd)
userRouter.post("/staff/search",staff.searchStaff)

//login
userRouter.post("/login",login.login)
module.exports=userRouter