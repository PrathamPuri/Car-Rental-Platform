import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const bookingCAr=(reqObj)=>async(dispatch)=>{
    dispatch({type:'LOADING',payload:true})

    try{
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/bookings/booking`,reqObj)
        dispatch({type:'LOADING',payload:false})
        console.log("Booking Successful - Showing Toast");
        console.log(reqObj)
        toast.success('Car Booked Successfully',{
            position:'top-center',
            autoClose:3000
        });
    }
    catch(error){
        console.log(error)
        dispatch({type:'LOADING',payload:false})
        toast.error('Booking Failed , Try Again',{
            position:'top-center',
            autoClose:3000
        });


    }
}