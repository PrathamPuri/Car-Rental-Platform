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
  const [seatsAvailable, setSeatsAvailable] = useState(1);  // Default 1 seat available

  const calculateHours = () => {
    if (startDate && endDate) {
      const diff = endDate.getTime() - startDate.getTime();
      setHours(diff / (1000 * 60 * 60));  // convert ms to hours
    }
  };

  const handleSeatsChange = (e) => {
    const newSeats = e.target.value;
    if (newSeats >= 1) {
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
      driverRequire: driver,
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
      <div className="min-h-screen bg-gray-900 text-white p-10">
        {loading && <Loader />}

        {car ? (
          <div className="carbooking flex flex-col md:flex-row bg-gray-800 rounded-lg shadow-lg p-6">
            {/* Car Info Section */}
            <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Booking Form Section */}
            <div className="md:w-1/2 px-4">
              <div className="carinfo p-6 bg-gray-700 rounded-md mb-4">
                <h2 className="text-xl font-semibold text-yellow-400 mb-4">Car Info</h2>
                <p className="text-lg font-semibold text-gray-300">{car.name}</p>
                <p className="text-md text-gray-300">Model: {car.model}</p>
                <p className="text-md text-gray-300">
                  Rent per Hour: <span className="font-bold">₹{car.rent}</span>
                </p>
                <p className="text-md text-gray-300">Fuel: {car.fuel}</p>
                <p className="text-md text-gray-300">Capacity: {car.capacity}</p>
              </div>

              {/* Booking Time Slot */}
              <div className="timeSlots bg-gray-700 rounded-md p-6">
                <h2 className="text-xl font-semibold text-yellow-400 mb-4">Select Time Slots</h2>

                {/* Start and End Location Inputs */}
                <div className="flex flex-col space-y-4 mb-4">
                  <label className="flex justify-between items-center">
                    Start Location:
                    <input
                      type="text"
                      value={startLocation}
                      onChange={(e) => setStartLocation(e.target.value)}
                      className="p-2 bg-gray-600 text-white border border-gray-500 rounded-md focus:ring-yellow-400"
                      placeholder="Enter start location"
                    />
                  </label>

                  <label className="flex justify-between items-center">
                    End Location:
                    <input
                      type="text"
                      value={endLocation}
                      onChange={(e) => setEndLocation(e.target.value)}
                      className="p-2 bg-gray-600 text-white border border-gray-500 rounded-md focus:ring-yellow-400"
                      placeholder="Enter end location"
                    />
                  </label>

                  {/* Start and End Date Inputs */}
                  <label className="flex justify-between items-center">
                    Start Date & Time:
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      showTimeSelect
                      timeIntervals={15}
                      dateFormat="yyyy/MM/dd HH:mm"
                      className="p-2 bg-gray-600 text-white border border-gray-500 rounded-md focus:ring-yellow-400"
                    />
                  </label>

                  <label className="flex justify-between items-center">
                    End Date & Time:
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      showTimeSelect
                      timeIntervals={15}
                      dateFormat="yyyy/MM/dd HH:mm"
                      minDate={startDate}
                      disabled={!startDate}
                      className="p-2 bg-gray-600 text-white border border-gray-500 rounded-md focus:ring-yellow-400"
                    />
                  </label>

                  {/* Seats Available */}
                  <label className="flex justify-between items-center">
                    Seats Available:
                    <input
                      type="number"
                      value={seatsAvailable}
                      onChange={handleSeatsChange}
                      min="1"
                      className="p-2 bg-gray-600 text-white border border-gray-500 rounded-md focus:ring-yellow-400"
                    />
                  </label>

                  {/* Optional Checkbox for Driver and Pooling */}
                  <div className="flex justify-between items-center space-x-4">
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
                      <p className="text-lg font-bold text-gray-300">Total Hours: {hours}</p>
                      <p className="text-lg font-bold text-gray-300">
                        Rent per Hour: ₹{car.rent}
                      </p>
                      <p className="text-lg font-bold text-yellow-400">Total Amount: ₹{totalAmount}</p>

                      <div className="flex justify-end mt-4">
                        <button
                          onClick={bookNow}
                          className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 px-6 py-2 rounded-md font-semibold"
                        >
                          Book Now
                        </button>
                      </div>
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
