import express from "express"
import { UserModule } from "../moduls/user.js"
import { validationResult } from "express-validator"
const Register=(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})

    }
    return res.status(200).json('ok')
}
export{Register}