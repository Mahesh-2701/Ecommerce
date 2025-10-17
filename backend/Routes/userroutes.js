const express = require("express")
const {validateusers , validateOrders ,validateuserupdate} = require("../Middlewares/joi")
const {adduser,addorder ,getorders ,getuserdetail ,updateuserdetail , changepassword ,resetpass} = require("../Controller/usercontroller")
const {checktoken} = require("../Middlewares/jwt")

const userrouter = express.Router()

userrouter.post("/signin",validateusers,adduser)
userrouter.post("/forgotpassword",changepassword)
userrouter.post("/resetpassword",resetpass)
userrouter.post("/order/:id",checktoken,validateOrders,addorder)
userrouter.get("/order/:id",checktoken,getorders)
userrouter.get("/userdetail",checktoken,getuserdetail)
userrouter.patch("/userdetailupdate",checktoken,validateuserupdate,updateuserdetail)

module.exports = userrouter