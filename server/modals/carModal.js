const mongoose=require('mongoose')

const carSchem=new mongoose.Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    image: { type: String, required: false }
})

const Car=mongoose.model('Car',carSchem)

module.exports=Car;