import React, { useState } from "react";
import axios from "axios";
import Default from '../components/Default'

const CarPoolingPage = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [rideType, setRideType] = useState("request");
  const [rides, setRides] = useState([]);

  // Function to search rides based on input filters
  const handleSearch = async () => {
    try {
      const queryParams = new URLSearchParams({
        startLocation,
        endLocation,
        startDate,
      }).toString();

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/pooling/booked?${queryParams}`
      );

      setRides(response.data);
    } catch (err) {
      console.error("Error fetching rides:", err);
    }
  };

  // Function to join a specific ride
  const handleJoinRide = async (rideId) => {
    const currentUser = JSON.parse(localStorage.getItem("user")) || {};
    const userId = currentUser?._id;

    if (!userId) {
      alert("You must be logged in to join a ride!");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/booking/join/${rideId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Successfully joined the ride!");
        refreshRides();
      } else {
        alert(data.message || "Failed to join the ride.");
      }
    } catch (error) {
      console.error("Error joining ride:", error);
      alert("An error occurred while joining the ride.");
    }
  };

  const refreshRides = async () => {
    try {
      const queryParams = new URLSearchParams({
        startLocation,
        endLocation,
        startDate,
      }).toString();
  
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/pooling/booked?${queryParams}`
      );
  
      setRides(response.data);
    } catch (err) {
      console.error("Error refreshing rides:", err);
    }
  };
  

  return (
    <Default>
      <div className="max-w-4xl mx-auto p-4 text-white">
      <h1 className="text-3xl font-bold text-center mb-8">Car Pooling</h1>

      {/* Ride Search Form */}
      <div className="grid gap-4 max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Start Location"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          className="p-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400"
        />

        <input
          type="text"
          placeholder="End Location"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
          className="p-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400"
        />

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-3 rounded-md bg-gray-700 border border-gray-600"
        />

        <select
          value={rideType}
          onChange={(e) => setRideType(e.target.value)}
          className="p-3 rounded-md bg-gray-700 border border-gray-600"
        >
          <option value="request">Request a Ride</option>
          <option value="offer">Offer a Ride</option>
        </select>

        <button
          onClick={handleSearch}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-md"
        >
          🔍 Search Rides
        </button>
      </div>

      {/* Available Rides List */}
      {rideType === "request" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Available Rides</h2>

          {rides.length === 0 ? (
            <p className="text-gray-300">No rides available for the selected route/date.</p>
          ) : (
            rides.map((ride) => (
              <div
                key={ride._id}
                className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-md"
              >
                <p>
                  <span className="font-semibold">Driver:</span>{" "}
                  {ride.user?.name || "Unknown"}
                </p>
                <p>
                  <span className="font-semibold">Car:</span>{" "}
                  {ride.car?.name || "Unknown"}
                </p>
                <p>
                  <span className="font-semibold">Seats Available:</span>{" "}
                  {ride.seatsAvailable || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Cost:</span> ₹
                  {ride.totalAmount ? (ride.totalAmount / 5).toFixed(1) : "N/A"}
                </p>
                <p>
                  <span className="font-semibold">From:</span>{" "}
                  {ride.startLocation}
                </p>
                <p>
                  <span className="font-semibold">To:</span>{" "}
                  {ride.endLocation}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {ride.bookedTimeSlot?.startDate
                    ? new Date(ride.bookedTimeSlot.startDate).toLocaleDateString()
                    : "Unknown"}
                </p>

                <button
                  onClick={() => handleJoinRide(ride._id)}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
                >
                  ✅ Join Ride
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
    </Default>
  )
};

export default CarPoolingPage;
