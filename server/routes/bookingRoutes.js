const express=require('express')
const bookingModal=require('../modals/carBooking')
const Car=require('../modals/carModal')

const router=express.Router();

router.post('/booking',async(req,res)=>{
    try{
        const newBooking= new  bookingModal(req.body);
        await newBooking.save();
        console.log(req.body)

        const car=await Car.findOne({_id : req.body.car})
        car.bookedTimeSlot.push(req.body.bookedTimeSlot)
        await car.save()
        
        res.json(newBooking);
        console.log('booking successfull')
    }
    catch(error){
        res.status(400).json(error);
        console.log(error)
    }
})

module.exports=router;