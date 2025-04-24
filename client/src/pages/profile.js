// pages/Profile.js
import React, { useEffect } from "react";
import Default from "../components/Default";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingCar";

const ProfilePage = () => {
  const dispatch = useDispatch();

  // Dispatch to fetch user bookings on component mount
  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  // Getting user info from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // If there is any error fetching bookings, you can use this:
  const { bookings } = useSelector((state) => state.bookingReducer) || [];
  console.log(bookings);

  return (
    <Default>
      <div className="max-w-2xl mx-auto mt-10 px-6 py-8 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
        <h1 className="text-4xl font-extrabold mb-6 text-yellow-400">
          Your Profile
        </h1>

        <div className="space-y-4 text-lg text-gray-300">
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold text-white">Name:</span>
            <span>{user.name}</span>
          </div>
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold text-white">Email:</span>
            <span>{user.email}</span>
          </div>

          {/* Displaying User Bookings */}
          <div className="mt-6 ">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
              Your Bookings
            </h2>
            <div className="space-y-3">
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 bg-gray-800 rounded-xl shadow-lg border border-gray-700 justify-between"
                  >
                    {/* Booking Details */}
                    <div className="flex flex-col justify-between">
                      <p className="text-lg font-semibold text-white">
                        Car:{" "}
                        {booking.car.name || booking.car.model || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-300">
                        Date:{" "}
                        {new Date(
                          booking.bookedTimeSlot.startDate
                        ).toLocaleDateString()}{" "}
                        -{" "}
                        {new Date(
                          booking.bookedTimeSlot.endDate
                        ).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-300">
                        Status: {booking.pooling ? "Pooling" : "Not Pooling"}
                      </p>
                      <p className="text-lg font-semibold text-white">
                        TotalAmount : ₹ {" "}
                        {booking.totalAmount || "Unknown"}
                      </p>
                    </div>
                    <div className="w-32 h-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-600">
                      <img
                        src={booking.car.image}
                        alt={booking.car.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-lg text-gray-400">No bookings found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Default>
  );
};

export default ProfilePage;
