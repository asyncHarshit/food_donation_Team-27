import React from "react";
import "./VolunteerDashboard.css";

// Helper function to format the 'Best Before' time (simulated data)
const formatBestBefore = (dateString) => {
  // In a real app, you'd use a library like date-fns or Moment.js
  // This is a simple placeholder to show the time remaining
  const now = new Date();
  const bestBefore = new Date(dateString);
  const diffInMinutes = Math.floor((bestBefore - now) / (1000 * 60));

  if (diffInMinutes <= 0) return "EXPIRED";
  if (diffInMinutes < 60) return `${diffInMinutes}m`;

  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;
  return `${hours}h ${minutes}m`;
};

const VolunteerDashboard = () => {
  // --- Simulated Donation Data based on Schema ---
  const donations = [
    {
      id: 1,
      restaurantName: "Hotel Sunrise",
      foodType: "Buffet Dinner",
      quantity: "8 kg",
      bestBefore: new Date(Date.now() + 1000 * 60 * 80).toISOString(), // 80 mins from now
      address: "MG Road, City Center",
      distance: "3.2 km",
      imageUrl: "https://via.placeholder.com/60x60?text=Food+1",
    },
    {
      id: 2,
      restaurantName: "Green Leaf Restaurant",
      foodType: "Veg Lunch",
      quantity: "5 kg",
      bestBefore: new Date(Date.now() + 1000 * 60 * 45).toISOString(), // 45 mins from now
      address: "Near City Mall",
      distance: "1.1 km",
      imageUrl: "https://via.placeholder.com/60x60?text=Food+2",
    },
  ];

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">Volunteer Dashboard</h2>
          <p className="dashboard-subtitle">
            Find nearby food rescues and complete pickups before food spoils.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <div className="pill">
            Active rescues <strong>2</strong>
          </div>
          <div className="pill">Radius</div>
        </div>
      </div>

      {/* LOCATION CARD */}
      <div className="card location-card">
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className="location-dot"></span>

          <div>
            <p className="location-label">Your location</p>
            <p className="location-value">Auto-detected • City Center</p>
          </div>
        </div>
      </div>

      {/* DONATIONS SECTION */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="section-title">Nearby donations</p>
          <p className="section-subtext">Showing within 5 km radius</p>
        </div>

        {/* DONATION CARDS MAPPED */}
        {donations.map((donation) => (
          <div key={donation.id} className="donation-card">
            <div className="donation-main-info">
              {/* Image URL Display */}
              <div className="donation-image-container">
                <img
                  src={donation.imageUrl}
                  alt={donation.foodType}
                  className="donation-image"
                />
              </div>

              <div className="donation-text-info">
                <p className="restaurant-name">{donation.restaurantName}</p>
                <p className="food-details">
                  {/* foodType + quantity combined */}
                  <strong>{donation.foodType}</strong> • {donation.quantity}
                </p>
                {/* address from location subdocument */}
                <p className="food-details-address">{donation.address}</p>
              </div>
            </div>

            <div className="donation-row">
              <div className="badges-row">
                <span className="badge-distance">{donation.distance}</span>
                {/* bestBefore field mapping */}
                <span className="badge-time">
                  Best before: {formatBestBefore(donation.bestBefore)}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                {/* The input slot now represents the OTP field (for pickup) */}
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="otp-input-slot"
                  maxLength="6"
                />
                {/* Status: "pending" -> Accept Rescue; "claimed" -> Pick Up */}
                <button className="accept-btn">Accept Rescue</button>
              </div>
            </div>
          </div>
        ))}
        {/* END DONATION CARDS */}
      </div>
    </div>
  );
};

export default VolunteerDashboard;
