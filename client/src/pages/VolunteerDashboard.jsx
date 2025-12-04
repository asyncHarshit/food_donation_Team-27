// src/pages/VolunteerDashboard.jsx
import { useState } from "react";
import "./VolunteerDashboard.css";

const MOCK_DONATIONS = [
  {
    id: 1,
    donorName: "Hotel Sunrise",
    foodType: "Buffet Dinner",
    quantity: "8 kg",
    distance: "3.2 km",
    timeLeft: "1h 20m",
    address: "MG Road, City Center",
  },
  {
    id: 2,
    donorName: "Green Leaf Restaurant",
    foodType: "Veg Lunch",
    quantity: "5 kg",
    distance: "1.1 km",
    timeLeft: "45m",
    address: "Near City Mall",
  },
];

export default function VolunteerDashboard() {
  const [radius, setRadius] = useState("5");
  const [donations, setDonations] = useState(MOCK_DONATIONS);
  const [selected, setSelected] = useState(null);

  const handleAccept = (donation) => {
    // TODO: backend call for claim
    setSelected(donation.id);
    alert(`Accepted donation from ${donation.donorName} (demo only)`);
  };

  const handleNavigate = (donation) => {
    // TODO: open Google Maps with coordinates
    alert(`Navigate to: ${donation.address}`);
  };

  return (
    <div className="vol-root">
      {/* Header */}
      <header className="vol-header">
        <div>
          <h1>Volunteer Dashboard</h1>
          <p className="vol-subtitle">
            Find nearby food rescues and complete pickups before food spoils.
          </p>
        </div>
        <div className="vol-header-right">
          <div className="vol-badge">
            Active rescues
            <span>{donations.length}</span>
          </div>
          <div className="vol-badge secondary">
            Radius
            <select value={radius} onChange={(e) => setRadius(e.target.value)}>
              <option value="3">3 km</option>
              <option value="5">5 km</option>
              <option value="10">10 km</option>
            </select>
          </div>
        </div>
      </header>

      <main className="vol-main">
        {/* Current location strip */}
        <section className="vol-location-strip">
          <span className="dot" />
          <div>
            <p className="vol-location-label">Your location</p>
            <p className="vol-location-value">Auto-detected • City Center</p>
          </div>
          <button className="vol-change-btn">Change</button>
        </section>

        {/* Nearby donations list */}
        <section className="vol-card">
          <div className="vol-card-header">
            <h2>Nearby donations</h2>
            <span className="vol-count">Showing within {radius} km radius</span>
          </div>

          {donations.length === 0 ? (
            <p className="vol-empty">
              No donations nearby right now. You’ll get a notification when
              something appears.
            </p>
          ) : (
            <div className="vol-list">
              {donations.map((d) => (
                <article key={d.id} className="vol-donation-card">
                  <div className="vol-card-top">
                    <div>
                      <h3>{d.donorName}</h3>
                      <p className="vol-meta">
                        {d.foodType} • {d.quantity}
                      </p>
                      <p className="vol-address">{d.address}</p>
                    </div>
                    <div className="vol-right-meta">
                      <span className="pill pill-distance">{d.distance}</span>
                      <span className="pill pill-time">
                        Best before: {d.timeLeft}
                      </span>
                    </div>
                  </div>

                  <div className="vol-card-bottom">
                    <button
                      className="btn-outline"
                      onClick={() => handleNavigate(d)}
                    >
                      Navigate
                    </button>
                    <button
                      className={
                        "btn-primary" +
                        (selected === d.id ? " btn-primary-disabled" : "")
                      }
                      onClick={() => handleAccept(d)}
                      disabled={selected === d.id}
                    >
                      {selected === d.id ? "Accepted" : "Accept Rescue"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* After-accept info (pickup flow hint) */}
        {selected && (
          <section className="vol-card vol-next-steps">
            <h2>Next steps</h2>
            <ol>
              <li>Use “Navigate” to reach the donor location.</li>
              <li>Verify food and ask the donor for the OTP code.</li>
              <li>Enter OTP in pickup screen (next step of prototype).</li>
              <li>Deliver to NGO / community point and mark as distributed.</li>
            </ol>
          </section>
        )}
      </main>
    </div>
  );
}
