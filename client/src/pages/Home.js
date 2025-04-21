import React, { useEffect, useState } from "react";
import Default from "../components/Default";
import { useSelector, useDispatch } from "react-redux";
import { carReducer } from "./../redux/reducer/carReducer";
import { getAllCars } from "../redux/actions/carsActions";
import { alertReducers } from "./../redux/reducer/alertsReducers";
import Loader from "./../components/Loader";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Home() {
  const { cars } = useSelector((state) => state.cars);
  const { loading } = useSelector((state) => state.alertReducers);
  const dispatch = useDispatch();

  let [startDate,setStartDate]=useState();
  let [endDate,setEndDate]=useState();
  let [totalCars,setTotalCars]=useState([]);

  useEffect(() => {
    dispatch(getAllCars());
    console.log();
  }, []);

  useEffect(()=>{
    setTotalCars(cars)
  },[cars])

  useEffect(()=>{
    if(startDate && endDate){
      dateFilter({startDate,endDate});
    }
  },[startDate,endDate])

  function dateFilter(values) {
    let temp = [];
  
    for (let car of cars) {
      if (car.bookedTimeSlot.length === 0) {
        temp.push(car);
      } else {
        let isAvailable = true;
        
        for (let booking of car.bookedTimeSlot) {
          const bookingStart=new Date(booking.startDate)
          const bookingEnd=new Date(booking.endDate)
          if (
            (startDate >= bookingStart && startDate <= bookingEnd) || 
            (endDate >= bookingStart && endDate<= bookingEnd) || 
            (bookingStart >= startDate && bookingStart <= endDate) || 
            (bookingEnd >= startDate && bookingEnd <= endDate) 
          ) {
            isAvailable = false;
            break; 
          }
        }
  
        if (isAvailable) {
          temp.push(car);
        }
      }
    }
  
    setTotalCars(temp);
  }


  return (
    <Default>
      {loading == true && <Loader />}
      <div className="flex m-2">
        <div className="dates flex justify-start">
        <DatePicker
        selected={startDate}
          onChange={(date)=>setStartDate(date)}
          className="p-2 m-1  bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-2 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 "
          placeholderText="Start Date"
          showTimeSelect
          timeFormat="HH:mm"
          dateFormat="yyyy/MM/dd HH:mm"
        />
        <DatePicker
        selected={endDate}
          onChange={(date)=>setEndDate(date)}
          className="p-2 m-1  bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-2 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 "
          placeholderText="End Date"
          showTimeSelect
          timeFormat="HH:mm"
          dateFormat="yyyy/MM/dd HH:mm"
          minDate={startDate}
          disabled={!startDate}
          
        />
        </div>
       <Link to="/carpooling">
        <button className="bg-yellow-400 text-black font-bold p-2 rounded-md mx-3 my-1">
          Carpooling
        </button>
      </Link>
      </div>

      <div className=" carClass min-h-screen flex justify-center px-10 ">
        <div className="grid grid-cols-3 w-5/6 sm:grid-cols-2 md:grid-cols-4 gap-5   p-6">
          {totalCars.map((car) => (
            <div
              key={car.id}
              className="card flex flex-col bg-gray-800 border-gray-600 hover:border-indigo-400 text-white hover:bg-gray-700 shadow-lg rounded-xl p-3 text-center  h-72 max-w-52"
            >
              <div className="image h-44 ">
                <img src={car.image}></img>
              </div>
              <div className=" p-2 ">
                <div className="flex flex-col text-left pb-5 ">
                  <h2 className="text-xl font-bold text-white py-1">
                    {car.name}
                  </h2>
                  <h3>Capacity : {car.capacity}</h3>
                </div>
                <div className="flex mt-auto gap-5 item-center justify-between align-center w-44">
                  <h3>Rent : {car.rent}</h3>
                  <button className="bg-yellow-400 text-gray-900  shadow-md hover:bg-yellow-500 text-sm font-bold rounded-md p-0.5 ">
                    <Link to={`/booking/${car._id}`}>BookNow</Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Default>
  );
}

export default Home;
