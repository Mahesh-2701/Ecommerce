const express = require("express")
const dbconnect = require("./Config/dbconnect")
const cors = require("cors")
const  router  = require("./Routes/adminroutes")
const userrouter = require("./Routes/userroutes")
const {multererror} = require("./Middlewares/multererrorhandler")
const path = require("path")
require("dotenv").config()

const PORT = process.env.PORT
const app = express()
dbconnect()

app.use(express.static(path.join(__dirname,"uploads")))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("",router)
app.use("",userrouter)
app.use(multererror)

app.listen(PORT,()=>console.log(`Server is running on PORT ${PORT}`))