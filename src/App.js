import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Register from './Register';
import Login from './Login';
import BusList from './BusList';
import Booking from './Booking';
import MyBookings from './MyBookings';

function App() {
  return (
    <Router>
      <div className="App">
        {/* You can add a Navbar here if needed */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/buses" element={<BusList />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
