const express=require('express')
const bookingModal=require('../modals/carBooking')
const Car=require('../modals/carModal')
require('../modals/carBooking')

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

router.get('/getAllBookings', async (req, res) => {
    try {
        const userId = req.body.userId || req.query.userId; // Or use req.user._id if you're using auth middleware
        if (!userId) {
          return res.status(400).json({ message: "User ID is required" });
        }
        // Fetch all bookings from the database
        const bookings = await bookingModal.find({ user: userId })
        .populate({
            path: 'car',
            select: 'name image'  // Select the fields you want from car
          })
       

        // Check if there are no bookings in the database
        if (bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
        }

        // Send the bookings as the response
        res.status(200).json(bookings);

    } catch (err) {
        // Log the error for debugging
        console.error('Error fetching bookings:', err.message);

        // Send an error response with more details
        return res.status(500).json({
            message: "Error fetching booked cars",
            error: err.message
        });
    }
});


module.exports=router;