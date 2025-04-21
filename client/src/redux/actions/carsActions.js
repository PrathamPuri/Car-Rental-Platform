import axios from 'axios';

export const getAllCars=()=>async dispatch=>{
    dispatch({type:'LOADING',payload:true})

    try{
        const response=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cars/getAllCars`)
        console.log(process.env.REACT_APP_BACKEND_URL)
        dispatch({type:'GET_ALL_CARS',payload:response.data})
        dispatch({type:'LOADING',payload:false})


    }
    catch(error){
        console.log(error)
        dispatch({type:'LOADING',payload:false})

    }
}