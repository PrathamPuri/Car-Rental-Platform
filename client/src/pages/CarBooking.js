import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Default from "../components/Default";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "./../redux/actions/carsActions";
import Loader from "./../components/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { bookingCAr } from "../redux/actions/bookingCar";

function CarBooking() {
  const dispatch = useDispatch();
  const { carid } = useParams();

  const carState = useSelector((state) => state.cars);
  const cars = carState?.cars || [];
  const loading = useSelector((state) => state.alertReducers?.loading || false);

  const [car, setCar] = useState(null);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hours, setHours] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [driver, setDriver] = useState(false);
  const [pooling, setPooling] = useState(false);
  const [seatsAvailable, setSeatsAvailable] = useState();
  const [isBooked, setIsBooked] = useState(false);  // Default 1 seat available

  const handleBooking = () => {
    setIsBooked(true); 
    bookNow();
  };

  const calculateHours = () => {
    if (startDate && endDate) {
      const diff = endDate.getTime() - startDate.getTime();
      setHours(diff / (1000 * 60 * 60));  // convert ms to hours
    }
  };

  const handleSeatsChange = (e) => {
    let newSeats = parseInt(e.target.value, 10); // Convert to a number
    if (newSeats >= 1 || e.target.value === "") {  // Allow empty value (if you want to clear it)
      setSeatsAvailable(newSeats);
    }
  };
  

  useEffect(() => {
    calculateHours();
  }, [startDate, endDate]);

  useEffect(() => {
    if (hours > 0 && car?.rent) {
      let amount = hours * car.rent;
      if (driver) {
        amount += 30 * hours;
      }
      setTotalAmount(amount);
    }
  }, [hours, driver, car]);

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    if (cars.length > 0) {
      const selectedCar = cars.find((car) => car._id === carid);
      setCar(selectedCar || null);
    }
  }, [cars, carid]);

  const bookNow = () => {
    const reqObj = {
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalAmount,
      hours,
      driverRequired: driver,
      bookedTimeSlot: { startDate, endDate },
      startLocation,
      endLocation,
      pooling,
      seatsAvailable,
    };
    dispatch(bookingCAr(reqObj));
  };

  return (
    <Default>
      <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-10">
        {loading && <Loader />}

        {car ? (
          <div className="carbooking grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
            {/* Car Info Section */}
            <div className="flex justify-center items-center">
              <img
                src={car.image}
                alt={car.name}
                className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Booking Form Section */}
            <div className="px-2 sm:px-4">
              <div className="carinfo p-4 sm:p-6 bg-gray-700 rounded-md mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-2 sm:mb-4">Car Info</h2>
                <p className="text-lg font-semibold text-gray-300">{car.name}</p>
                <p className="text-md text-gray-300">Model: {car.model}</p>
                <p className="text-md text-gray-300">
                  Rent per Hour: <span className="font-bold">₹{car.rent}</span>
                </p>
                <p className="text-md text-gray-300">Fuel: {car.fuel}</p>
                <p className="text-md text-gray-300">Capacity: {car.capacity}</p>
              </div>

              {/* Booking Time Slot */}
              <div className="timeSlots bg-gray-700 rounded-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-4">Select Time Slots</h2>

                <div className="flex flex-col space-y-4 mb-4">
                  {/* Start & End Location */}
                  <label className="flex flex-col text-sm sm:text-base">
                    Start Location:
                    <input
                      type="text"
                      value={startLocation}
                      onChange={(e) => setStartLocation(e.target.value)}
                      className="mt-1 p-2 bg-gray-600 text-white border border-gray-500 rounded-md focus:ring-yellow-400"
                      placeholder="Enter start location"
                    />
                  </label>

                  <label className="flex flex-col text-sm sm:text-base">
                    End Location:
                    <input
                      type="text"
                      value={endLocation}
                      onChange={(e) => setEndLocation(e.target.value)}
                      className="mt-1 p-2 bg-gray-600 text-white border border-gray-500 rounded-md focus:ring-yellow-400"
                      placeholder="Enter end location"
                    />
                  </label>

                  {/* Date Pickers */}
                  <label className="flex flex-col text-sm sm:text-base">
                    Start Date & Time:
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      showTimeSelect
                      timeIntervals={15}
                      dateFormat="yyyy/MM/dd HH:mm"
                      className="mt-1 p-2 bg-gray-600 text-white border border-gray-500 rounded-md focus:ring-yellow-400"
                    />
                  </label>

                  <label className="flex flex-col text-sm sm:text-base">
                    End Date & Time:
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      showTimeSelect
                      timeIntervals={15}
                      dateFormat="yyyy/MM/dd HH:mm"
                      minDate={startDate}
                      disabled={!startDate}
                      className="mt-1 p-2 bg-gray-600 text-white border border-gray-500 rounded-md focus:ring-yellow-400"
                    />
                  </label>

                  {/* Seats */}
                  <label className="flex flex-col text-sm sm:text-base">
                    Seats Available:
                    <input
                      type="number"
                      value={seatsAvailable}
                      onChange={handleSeatsChange}
                      min="1"
                      className="mt-1 p-2 bg-gray-600 text-white border border-gray-500 rounded-md focus:ring-yellow-400"
                    />
                  </label>

                  {/* Checkboxes */}
                  <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={driver}
                        onChange={() => setDriver(!driver)}
                        className="mr-2"
                      />
                      Driver Required
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={pooling}
                        onChange={() => setPooling(!pooling)}
                        className="mr-2"
                      />
                      Car Pooling
                    </label>
                  </div>

                  {/* Total Amount */}
                  {startDate && endDate && (
                    <div className="mt-4">
                      <p className="text-base font-bold text-gray-300">Total Hours: {hours ? hours.toFixed(1) : '0.0'}</p>
                      <p className="text-base font-bold text-gray-300">Rent per Hour: ₹{car.rent}</p>
                      <p className="text-lg font-bold text-yellow-400">Total Amount: ₹{totalAmount ? totalAmount.toFixed(1) : '0.0'}</p>

                      {/* Hide button if booking is complete */}
                      {!isBooked && (
                        <div className="flex justify-end mt-4">
                          <button
                            onClick={handleBooking}
                            className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 px-6 py-2 rounded-md font-semibold"
                          >
                            Book Now
                          </button>
                        </div>
                      )}

                      {/* Confirmation Message */}
                      {isBooked && (
                        <div className="mt-4 text-center text-lg text-green-400">
                          <p>Your booking has been confirmed!</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-center text-3xl text-yellow-400">No Car Found</h1>
        )}
      </div>
    </Default>
  );

}

export default CarBooking;
