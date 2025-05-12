import React, { useState } from 'react';
import './css/Booking.css';

const Booking = () => {
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    age: '',
    gender: '',
    seatCount: 1,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    console.log('Booking details:', bookingDetails);
    // Later: Send to backend with selected busId + passengerId
    setMessage('Booking successful!');
  };

  return (
    <div className="booking-container">
      <h2>Confirm Your Booking</h2>
      <form onSubmit={handleBooking} className="booking-form">
        <label>Name:</label>
        <input type="text" name="name" value={bookingDetails.name} onChange={handleChange} required />

        <label>Age:</label>
        <input type="number" name="age" value={bookingDetails.age} onChange={handleChange} required />

        <label>Gender:</label>
        <select name="gender" value={bookingDetails.gender} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Seats:</label>
        <input type="number" name="seatCount" value={bookingDetails.seatCount} onChange={handleChange} min="1" max="6" />

        <button type="submit">Confirm Booking</button>
      </form>
      {message && <p className="success">{message}</p>}
    </div>
  );
};

export default Booking;
