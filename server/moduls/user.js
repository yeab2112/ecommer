import mongoose from "mongoose";
const UserS = new mongoose.Schema({
    name: {type:String,
        require:true
    },
    email:{ type:String,
        unique:true,
        require:true
    },
    password: {type:String,
        require:true},
    });
   
    const UserM = mongoose.model('register', UserS);
   

 export {UserM}