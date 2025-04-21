import React, { useState } from "react";
import Default from "../components/Default";
import carImage from "../assets/carImage.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegister } from "../redux/actions/userActions";

function Registration() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "", 
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegister(formData));
    console.log(formData);
  };

  return (
    <>
      <div className="flex justify-end min-h-screen px-6 py-12 bg-gray-900">
        <div className="flex pl-10 items-center w-3/4">
          <img src={carImage} alt="carImage" className="w-2/3" />
        </div>

        <div className="loginContainer w-full max-w-md bg-gray-800 border-gray-600 shadow-lg rounded-md h-fit">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-300">
              Register
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-5">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="p-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name} 
                    onChange={handleChange}
                    className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-gray-100 border border-gray-600 placeholder:text-gray-100 focus:ring-2 sm:text-sm"
                  />
                </div>
              </div>

             
              <div className="p-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email} 
                    onChange={handleChange}
                    autoComplete="email"
                    className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-gray-100 border border-gray-600 placeholder:text-gray-100 focus:ring-2 sm:text-sm"
                  />
                </div>
              </div>

             
              <div className="p-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}  
                    onChange={handleChange}
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-gray-100 border border-gray-600 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
                  />
                </div>
              </div>

            
              <div className="p-2">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-blue-500 focus:outline-indigo-600"
                >
                  Sign up
                </button>
                <Link to="/login" className="flex justify-center pt-2 text-blue-400">
                  Click Here To Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
