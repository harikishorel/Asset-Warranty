const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://diwaarvind6:Diwa@cluster0.jxw0na0.mongodb.net/Asset?retryWrites=true&w=majority').then(()=>{
    console.log('mongodb connected');

})
.catch(()=>{
    console.log('failed')
})  

const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const collection = mongoose.model('Collection',newSchema)



module.exports = collection;


