import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Registration';
import CarPooling from './pages/CarPooling';
import CarBooking from './pages/CarBooking';
import ProfilePage from './pages/profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ToastContainer />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <ProfilePage />
              </ProtectedRoutes>
            }
          />

<Route
            path="/carpooling"
            element={
              <ProtectedRoutes>
                <CarPooling/>
              </ProtectedRoutes>
            }
          />

          <Route
            path="/booking/:carid"
            element={
              <ProtectedRoutes>
                <CarBooking />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

// 🔐 Protected Route Wrapper
export function ProtectedRoutes({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
