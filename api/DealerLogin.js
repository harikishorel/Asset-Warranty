const mongoose = require('mongoose')

const newSchema=new mongoose.Schema({
    demail:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const DealerLogin = mongoose.model('DealerLogin',newSchema)



module.exports = DealerLogin;


