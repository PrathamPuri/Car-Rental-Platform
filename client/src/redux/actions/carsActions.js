import axios from 'axios';

export const getAllCars=()=>async dispatch=>{
    dispatch({type:'LOADING',payload:true})

    try{
        const response=await axios.get(`https://car-rental-platform-gs79.onrender.com/api/cars/getAllCars`)
        console.log(process.env.REACT_APP_BACKEND_URL)
        dispatch({type:'GET_ALL_CARS',payload:response.data})
        dispatch({type:'LOADING',payload:false})


    }
    catch(error){
        console.log(error)
        dispatch({type:'LOADING',payload:false})

    }
}