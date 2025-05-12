import React, { useEffect, useState } from 'react';
import api from "./api";
import './css/MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in first.");
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/bookings/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          console.error("Failed to fetch bookings.");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading your bookings...</p>;

  return (
    <div className="bookings-container">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div className="booking-card" key={booking.id}>
            <h3>{booking.busName}</h3>
            <p>{booking.source} ➜ {booking.destination}</p>
            <p>Date: {booking.bookingDate}</p>
            <p>Seat: {booking.seatNumber}</p>
            <p>Passenger Info: {booking.passengerInfo}</p>
            <p>Total Fare: ₹{booking.fare}</p>
            <p>Status: <strong>{booking.status}</strong></p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;
