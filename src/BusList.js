import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './css/BusList.css';

const dummyBuses = [
  {
    id: 1,
    busName: 'GreenLine Express',
    source: 'City A',
    destination: 'City B',
    departureTime: '08:00 AM',
    arrivalTime: '12:00 PM',
    seatsAvailable: 10,
    fare: 350,
  },
  {
    id: 2,
    busName: 'BlueBird Travels',
    source: 'City A',
    destination: 'City B',
    departureTime: '10:00 AM',
    arrivalTime: '02:00 PM',
    seatsAvailable: 4,
    fare: 400,
  },
];

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");
  const destination = queryParams.get("destination");

  useEffect(() => {
    if (source && destination) {
      fetch(`http://localhost:8080/api/buses/search?source=${source}&destination=${destination}`)
        .then((res) => res.json())
        .then((data) => setBuses(data))
        .catch((err) => console.error("Error fetching buses:", err));
    }
  }, [source, destination]);

  const handleBook = (busId) => {
    console.log(`Book bus with Id: ${busId}`);
    navigate(`/book/${busId}`);
  };

  return (
    <div className="buslist-container">
      <h2>Available Buses</h2>
      {buses.length === 0 ? (
        <p>No buses available for {source} → {destination}</p>
      ) : (
        <table className="bus-table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Destination</th>
              <th>Departure</th>
              <th>Seats</th>
              <th>Fare</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id}>
                <td>{bus.source}</td>
                <td>{bus.destination}</td>
                <td>{bus.departureTime}</td>
                <td>{bus.availableSeats}</td>
                <td>{bus.fare}</td>
                <td>
                  <button onClick={() => handleBook(bus.id)}>Book</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    //   <h2>Available Buses</h2>
    //   {dummyBuses.map((bus) => (
    //     <div className="bus-card" key={bus.id}>
    //       <h3>{bus.busName}</h3>
    //       <p>{bus.source} ➜ {bus.destination}</p>
    //       <p>Time: {bus.departureTime} - {bus.arrivalTime}</p>
    //       <p>Seats: {bus.seatsAvailable}</p>
    //       <p>Fare: ₹{bus.fare}</p>
    //       <button onClick={() => handleBook(bus.id)}>Book Now</button>
    //     </div>
    //   ))}
    // </div>
  );
};

export default BusList;
