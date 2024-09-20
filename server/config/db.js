import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config({path:"./config/.env"})
 const connction= async()=>{
    try{
         await mongoose.connect(process.env.URL)
         console.log('mongoDB connected')

    }catch(err){console.log(err)

    }
 }
 connction()