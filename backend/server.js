const app = require("./app")
const env = require('dotenv')
const mongoose = require('mongoose')

env.config({path:'./config.env'});

const DB = process.env.MONGO_DB

mongoose.connect(DB,{
    useNewUrlParser:true,
}).then(()=>console.log("connection successfull")).catch((err)=>console.log(err.message))

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})