const usermodel = require("../Models/users");
const orderModel = require("../Models/orders");
const { passresettoken } = require("../Middlewares/jwt");
const { sendmail ,sendProductConfirmationMail } = require("../Middlewares/nodemailer");
const {
  createCheckoutSession,
  checkWebhook,
} = require("../Middlewares/stripe");
const dotenv = require("dotenv");
require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_KEY);
const jwt = require("jsonwebtoken");

exports.adduser = async function (req, res) {
  let userdetails = { ...req.body };

  try {
    let result = await usermodel.create({ ...userdetails });

    if (result) {
      res.status(200).json({ success: true, message: "Signup Success" });
    }
  } catch (err) {
    res.status(500).json({ success: true, message: err.message });
  }
};

exports.addorder = async function (req, res) {
  const { products, phoneno, pincode, address, paymentmethod } = req.body;
  const userid = req.params.id;

  const totalprice = products.reduce(
    (tot, item) => tot + item.price * item.quantity,
    0
  );

  try {
    let result = await orderModel.create({
      userid: userid,
      items: products,
      totalprice: totalprice,
      phoneno: phoneno,
      pincode: pincode,
      address: address,
      paymentmethod: paymentmethod,
    });

    let lineitems = products.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    let session = await createCheckoutSession(lineitems, result);

    res
      .status(200)
      .json({
        success: true,
        status: 200,
        message: "Url sent",
        url: session.url,
        id: session.id,
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, status: 500, message: err.message });
  }
};

exports.getorders = async function (req, res) {
  let userid = req.params.id;

  try {
    let result = await orderModel
      .find({ userid: userid , paymentStatus:"success"})
      .populate("userid")
      .populate("items.productid").sort({ _id : -1});

    if (result) {
      res
        .status(200)
        .json({
          success: true,
          status: 200,
          message: "Data getted",
          data: result,
        });
    } else {
      res
        .status(400)
        .json({ success: false, status: 400, message: "No data found" });
    }
  } catch (err) {
    res.status(400).json({ success: false, status: 400, message: err.message });
  }
};

exports.getuserdetail = async function (req, res) {
  let userid = req.user;

  try {
    let result = await usermodel.findOne({ _id: userid });

    if (result) {
      res
        .status(200)
        .json({
          success: true,
          status: 200,
          message: "Data getted",
          data: result,
        });
    } else {
      res
        .status(400)
        .json({ success: false, status: 400, message: "No data found" });
    }
  } catch (err) {
    res.status(400).json({ success: false, status: 400, message: err.message });
  }
};

exports.updateuserdetail = async (req, res) => {
  let userid = req.user;
  let userdetails = { ...req.body };

  try {
    let result = await usermodel.updateOne(
      { _id: userid },
      { $set: userdetails }
    );
    console.log(userid, result);
    if (result.matchedCount > 0) {
      res
        .status(200)
        .json({
          success: true,
          status: 200,
          message: "Data updated",
          data: result,
        });
    } else {
      res
        .status(400)
        .json({ success: false, status: 400, message: "No data found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, status: 500, message: err.message });
  }
};

// for changing the password

exports.changepassword = async (req, res) => {
  let emailentered = req.body.email;
  
  try {
    let result = await usermodel.findOne({ email: emailentered });

    if (!result)
      return res
        .status(400)
        .json({ success: false, status: 400, message: "User not found" });

    const resettoken = passresettoken(emailentered, process.env.SECRET_TOKEN);

    let resetlink = `${process.env.APP_URL}resetlink/${resettoken}`;

    await sendmail(emailentered, resetlink);

    res
      .status(200)
      .json({
        success: true,
        status: 200,
        message: "Reset Link sent to your Mail",
      });
  } catch (err) {
    res.status(500).json({ success: false, status: 500, message: err.message });
  }
};

exports.resetpass = async (req, res) => {
  const { password, token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

    const user = await usermodel.findOne({ email: decoded.email });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User Not Found", status: 400 });

    user.password = password;

    await user.save();

    res
      .status(200)
      .json({
        success: true,
        status: 200,
        message: "Password Updated Successfully",
      });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        status: 500,
        message: "Invalid or expired token",
      });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  try {
    const event = await checkWebhook(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

if (event.type === "checkout.session.completed") {
  const session = event.data.object;

  // Retrieve the full session with metadata
  const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["line_items"],
  });

  const orderId = fullSession.metadata.orderid;
  const userId = fullSession.metadata.userid;

  console.log("✅ Payment successful for Order ID:", orderId);
  console.log("User ID:", userId);

  await orderModel.findByIdAndUpdate(orderId, {
    $set: { paymentStatus: "success" },
  });

  let order = await orderModel.findById(orderId).populate("userid").populate("items.productid")

  await sendProductConfirmationMail(order.userid.email,order)
}

// Payment failed or canceled
else if (
  event.type === "checkout.session.expired" ||
  event.type === "checkout.session.async_payment_failed"
) {
  const session = event.data.object;

  const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["line_items"],
  });

  const orderId = fullSession.metadata.orderid;
  const userId = fullSession.metadata.userid;

  console.log("❌ Payment failed for Order ID:", orderId);
  console.log("User ID:", userId);

  await orderModel.findByIdAndDelete(orderId)
}


    res.status(200).json({ received: true });
  } catch (err) {
    console.log("Error Occured : " + err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

exports.retrieveSession = async(req,res)=>{

  const stripesessionid = req.params.id

  try{
  
    const session = await stripe.checkout.sessions.retrieve(stripesessionid,{ expand : ["line_items"]})

     // Optional: sanitize/shape the response
    const safe = {
      id: session.id,
      amount_total: session.amount_total,
      currency: session.currency,
      payment_status: session.payment_status, // 'paid' | 'unpaid' | ...
      customer_email: session.customer_details?.email,
      line_items: session.line_items?.data?.map(li => ({
        name: li.description,
        quantity: li.quantity,
        price: li.price?.unit_amount
      })),
      payment_intent: session.payment_intent?.id ?? null
    };

    res.status(200).json({success:true,status:200,message:"Data sented",data:safe})
  
  }
  catch(err){
    res.status(500).json({success:false,status:500,message:"Server Error "+err.message})
  }
}

exports.updateSession = async(req,res)=>{

  const stripesession = req.params.id

  try{
    
    const session = await stripe.checkout.sessions.retrieve(stripesession,{ expand : ["line_items"]})

    const result = await orderModel.findByIdAndDelete(session.metadata.orderid)

    if(result){
      res.status(201).json({success:true,status:201,message:"Order Deleted Status Updated"})
    }
    else{
      res.status(400).json({success:false,status:400,message:"Order Not found"})
    }

  }
  catch(err){
    res.status(500).json({success:false,status:500,message:"Server Error "+err.message})
  }
}