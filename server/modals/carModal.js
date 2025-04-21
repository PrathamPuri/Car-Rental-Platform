const mongoose=require('mongoose')

const carSchem=new mongoose.Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    bookedTimeSlot:[{
        startDate: { type: String },
        endDate: { type: String }
      } ],
    rent: {type:Number,required:true},
    fuel: {type:String ,required:true},
    capacity:{type:Number,required:true},
    image: { type: String, required: false }
   

})

const Car=mongoose.model('cars',carSchem)

module.exports=Car;