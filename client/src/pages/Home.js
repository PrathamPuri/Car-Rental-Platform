import React, { useEffect, useState } from "react";
import Default from "../components/Default";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../redux/actions/carsActions";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Home() {
  const { cars } = useSelector((state) => state.cars);
  const { loading } = useSelector((state) => state.alertReducers);
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [filteredCars, setFilteredCars] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      dateFilter();
    }
  }, [startDate, endDate]);

  function dateFilter() {
    if (!startDate || !endDate) return;

    const selectedStart = new Date(startDate).getTime();
    const selectedEnd = new Date(endDate).getTime();

    const temp = cars.filter((car) => {
      if (car.bookedTimeSlot.length === 0) return true;

      for (let slot of car.bookedTimeSlot) {
        const bookingStart = new Date(slot.startDate).getTime();
        const bookingEnd = new Date(slot.endDate).getTime();

        if (
          selectedStart < bookingEnd &&
          selectedEnd > bookingStart
        ) {
          return false;
        }
      }

      return true;
    });

    setFilteredCars(temp);
    setFilterApplied(true);
  }

  return (
    <Default>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center rounded-3xl mx-4 mt-8 shadow-2xl overflow-hidden">
        <div className="bg-black/70 backdrop-blur-sm px-6 py-24 md:py-32 text-center rounded-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-xl leading-tight">
            Book Your Ride Effortlessly
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Discover the easiest way to book cars. Reliable, fast, and incredibly convenient.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/carpooling">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg px-6 py-3 rounded-full shadow-md transition-transform hover:scale-105">
                Try Carpooling
              </button>
            </Link>
            <a href="#cars">
              <button className="border border-gray-300 text-white hover:bg-white hover:text-black text-lg font-semibold px-6 py-3 rounded-full transition-all shadow-md hover:scale-105">
                View Cars
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Filter Toggle */}
      <div className="flex justify-start mt-10 px-6">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-md transition duration-300 shadow-lg"
        >
          {showFilter ? "Hide Filter" : "Filter by Date"}
        </button>
      </div>

      {/* Date Filters */}
      {showFilter && (
        <div className="flex justify-center flex-wrap gap-4 p-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:border-yellow-400 focus:ring-yellow-400"
            placeholderText="Start Date"
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="yyyy/MM/dd HH:mm"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:border-yellow-400 focus:ring-yellow-400"
            placeholderText="End Date"
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="yyyy/MM/dd HH:mm"
            minDate={startDate}
            disabled={!startDate}
          />
        </div>
      )}

      {/* Cars Listing */}
      <section id="cars" className="min-h-screen px-6 py-8">
        {!filterApplied ? (
          <div className="text-white text-center mt-16">
            <p className="text-xl">🚗 Please apply a date filter to view available cars.</p>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="text-white text-center mt-16">
            <p className="text-2xl font-semibold">😔 No cars available for the selected dates.</p>
            <p className="text-sm text-gray-400 mt-2">Try changing your date range.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {filteredCars.map((car) => (
              <div
                key={car._id}
                className="bg-gray-800 border border-gray-700 hover:border-yellow-400 text-white rounded-xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105"
              >
                <div className="h-44">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col h-40 justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-1">{car.name}</h2>
                    <p className="text-sm text-gray-400">Capacity: {car.capacity}</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <p className="font-semibold text-yellow-400">₹{car.rent}</p>
                    <Link to={`/booking/${car._id}`}>
                      <button className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-bold px-4 py-2 rounded-md shadow">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Default>
  );
}

export default Home;
