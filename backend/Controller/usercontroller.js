const usermodel = require("../Models/users")
const orderModel = require("../Models/orders")
const { passresettoken} = require("../Middlewares/jwt")
const {sendmail} = require("../Middlewares/nodemailer")
const dotenv = require("dotenv")
require("dotenv").config()
const jwt = require("jsonwebtoken")


exports.adduser =async function(req,res){
   let userdetails = {...req.body}

   try{
       
     let result = await usermodel.create({...userdetails})

     if(result){
        res.status(200).json({success:true,message:"Signup Success"})
     }
   }
   catch(err){
       res.status(500).json({success:true,message:err.message})
   }
}

exports.addorder = async function (req,res) {
   const { products ,phoneno , pincode ,address,paymentmethod} = req.body
   const userid = req.params.id

   const totalprice = products.reduce((tot,item)=> tot + item.price * item.quantity,0)

   try{

       let result = await orderModel.create({
         userid : userid ,
         items : products,
         totalprice: totalprice,
         phoneno:phoneno,
         pincode:pincode,
         address:address,
         paymentmethod:paymentmethod
        } )


       if(result){
         res.status(201).json({ success : true , status : 201 , message :"Order Placed"})
       }
       else{
         res.status(500).json({ success : false , status : 500 , message :"Error Occured"})
       }
   }
   catch(err){
    console.log(err.message)
         res.status(500).json({ success : false , status : 500 , message :err.message})
   }
}

exports.getorders =async function(req,res){
  let userid = req.params.id;

  try{
    let result = await orderModel.find({userid:userid}).populate("userid").populate("items.productid")

    if(result){
      res.status(200).json({success:true,status:200,message:"Data getted",data:result})

    }
    else{
      res.status(400).json({success:false,status:400,message:"No data found"})
    }
  }
  catch(err){
      res.status(400).json({success:false,status:400,message:err.message})
  }
}

exports.getuserdetail = async function (req,res) {

  let userid = req.user

  try{
     let result = await usermodel.findOne({_id:userid})
     
      if(result){
      res.status(200).json({success:true,status:200,message:"Data getted",data:result})

    }
    else{
      res.status(400).json({success:false,status:400,message:"No data found"})
    }
  }
  catch(err){
     res.status(400).json({success:false,status:400,message:err.message})
  }
  
}

exports.updateuserdetail = async(req,res) =>{

  let userid = req.user
  let userdetails = {...req.body}

  try{
      
    let result = await usermodel.updateOne({_id:userid},{$set : userdetails})
    console.log(userid , result)
      if(result.matchedCount > 0 ){
      res.status(200).json({success:true,status:200,message:"Data updated",data:result})
       }
    else{
      res.status(400).json({success:false,status:400,message:"No data found"})
    }
  }
  catch(err){
      res.status(500).json({success:false,status:500,message:err.message})
  }

}

// for changing the password

exports.changepassword = async (req,res) => {
   
  let emailentered = req.body.email

  try{
    
    let result = await usermodel.findOne({ email : emailentered})
 

    if(!result) return res.status(400).json({success:false,status:400,message:"User not found"})

    const resettoken =  passresettoken(emailentered,process.env.SECRET_TOKEN)

    let resetlink = `${process.env.APP_URL}resetlink/${resettoken}`

    await sendmail(emailentered,resetlink)

     res.status(200).json({success:true,status:200,message:"Reset Link sent to your Mail"})
  }
  catch(err){
     res.status(500).json({success:false,status:500,message:err.message})
  }
}

exports.resetpass = async (req,res) => {
  const {password,token} = req.body

  try{
     
    const decoded = jwt.verify(token,process.env.SECRET_TOKEN)

    const user = await usermodel.findOne({email:decoded.email})

    if(!user) return res.status(400).json({success:false,message:"User Not Found",status:400})

    user.password = password

    await user.save()

    res.status(200).json({success:true,status:200,message:"Password Updated Successfully"})
  }
  catch(err){
    res.status(500).json({success:false,status:500,message:"Invalid or expired token"})
  }

}