const adminRouter=require("express").Router()
const supplier=require("../api/supplier/supplier crud/supplierController")
const product =require("../api/admin/products/productController")
const category=require("../api/supplier/category/categoryController")
const label=require("../api/label/labelController")
const dispatch=require("../api/dispatch/dispatchController")

//supplier
adminRouter.post('/supplier/add',supplier.addsupplier)
adminRouter.get("/supplier/all",supplier.allsupplier)
adminRouter.post("/supplier/single",supplier.singleSupplier)
adminRouter.put("/supplier/update",supplier.updateSupplier)
adminRouter.post("/supplier/delete",supplier.deleteSupplier)
adminRouter.post("/supplier/search",supplier.searchSupplier)
//product
adminRouter.post("/product/add",product.addProduct)
adminRouter.get("/product/all",product.allProduct)
adminRouter.post("/product/single",product.singleProduct)
adminRouter.put("/product/update",product.updateProduct)
adminRouter.post("/product/delete",product.deleteProduct)
adminRouter.post("/product/search",product.searchProduct)

//category
adminRouter.post("/category/add",category.addCategory)
adminRouter.get("/category/all",category.allCategory)
adminRouter.post("/category/single",category.singleCategory)
adminRouter.put('/category/update',category.updateCategory)
adminRouter.post("/category/delete",category.deleteCategory)
adminRouter.post("/category/search",category.searchCategory)
//dispatch
adminRouter.post("/dispatch/add",dispatch.addDispatch)
adminRouter.get("/dispatch/all",dispatch.allDispatch)
adminRouter.post("/dispatch/single",dispatch.singleDispatch)
adminRouter.post("/dispatch/delete",dispatch.deleteDispatch)
adminRouter.put("/dispatch/update",dispatch.updateDispatch)

//label
adminRouter.post("/label/add",label.generateLabel)
adminRouter.get("/label/all",label.AllLabel)
adminRouter.post("/label/single",label.SingleLabel)
adminRouter.post("/label/delete",label.deleteLabel)
adminRouter.put("/label/update",label.updateLabel)
adminRouter.post("/label/search",label.searchLabel)
module.exports=adminRouter  