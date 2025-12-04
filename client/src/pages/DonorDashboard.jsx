// src/pages/DonorDashboard.jsx
import { useState } from "react";
import "./DonorDashboard.css";

const PRESETS = [
  { id: 1, label: "Regular Dinner • 10 kg", foodType: "Mixed Buffet Dinner", qty: 10 },
  { id: 2, label: "Lunch • 5 kg", foodType: "Veg Thali Lunch", qty: 5 },
];

const MOCK_DONATIONS = [
  {
    id: 1,
    foodType: "Buffet Dinner",
    quantity: "8 kg",
    status: "Posted",
    bestBefore: "1h 20m",
    createdAt: "Today • 7:30 PM",
    otp: "4829",
  },
  {
    id: 2,
    foodType: "Veg Lunch",
    quantity: "5 kg",
    status: "Accepted",
    bestBefore: "45m",
    createdAt: "Today • 1:00 PM",
    otp: "7391",
  },
];

export default function DonorDashboard() {
  const [form, setForm] = useState({
    foodType: "",
    quantity: "",
    bestBeforeHours: "2",
    notes: "",
    presetId: null,
  });

  const [donations] = useState(MOCK_DONATIONS);

  const handlePreset = (preset) => {
    setForm((prev) => ({
      ...prev,
      foodType: preset.foodType,
      quantity: preset.qty,
      presetId: preset.id,
    }));
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: backend call: create donation in DB
    alert("Donation posted (frontend demo)!");
  };

  return (
    <div className="donor-root">
      {/* Top bar */}
      <header className="donor-header">
        <div>
          <h1>Donor Dashboard</h1>
          <p className="donor-subtitle">
            Post surplus food in under 30 seconds and track every pickup.
          </p>
        </div>
        <div className="donor-summary">
          <div className="donor-badge">
            Meals saved
            <span>320</span>
          </div>
          <div className="donor-badge secondary">
            Total donations
            <span>18</span>
          </div>
        </div>
      </header>

      <main className="donor-main">
        {/* Quick Donate card */}
        <section className="donor-card">
          <h2>Quick Donate</h2>
          <p className="donor-hint">
            Use a preset or fill food details. Location will be auto-detected on the phone.
          </p>

          <div className="donor-presets">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                className={
                  "preset-btn" + (form.presetId === p.id ? " active" : "")
                }
                onClick={() => handlePreset(p)}
              >
                {p.label}
              </button>
            ))}
          </div>

          <form className="donor-form" onSubmit={handleSubmit}>
            <div className="donor-row">
              <div className="field">
                <label>Food type</label>
                <input
                  placeholder="e.g. Veg Biryani, Roti, Dal"
                  value={form.foodType}
                  onChange={(e) => handleChange("foodType", e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <label>Quantity (kg)</label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 5"
                  value={form.quantity}
                  onChange={(e) => handleChange("quantity", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="donor-row">
              <div className="field">
                <label>Best before (hours)</label>
                <select
                  value={form.bestBeforeHours}
                  onChange={(e) =>
                    handleChange("bestBeforeHours", e.target.value)
                  }
                >
                  <option value="2">2 hours</option>
                  <option value="3">3 hours</option>
                  <option value="4">4 hours</option>
                </select>
              </div>
              <div className="field">
                <label>Notes (optional)</label>
                <input
                  placeholder="Less spicy, contains dairy, etc."
                  value={form.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                />
              </div>
            </div>

            <div className="donor-disclaimer">
              <label>
                <input type="checkbox" required /> 
                Food was cooked within safe time and stored hygienically.
              </label>
            </div>

            <button className="primary-btn" type="submit">
              Post Donation
            </button>
          </form>
        </section>

        {/* Active donations list */}
        <section className="donor-card">
          <div className="donor-card-header">
            <h2>Your active donations</h2>
            <span className="donor-count">{donations.length} listed</span>
          </div>

          {donations.length === 0 ? (
            <p className="donor-empty">
              No active donations. Post your first donation above.
            </p>
          ) : (
            <div className="donor-list">
              {donations.map((d) => (
                <article key={d.id} className="donor-donation-card">
                  <div className="ddc-top">
                    <div>
                      <h3>{d.foodType}</h3>
                      <p className="ddc-meta">
                        {d.quantity} • {d.createdAt}
                      </p>
                    </div>
                    <span
                      className={
                        "status-pill " +
                        (d.status === "Accepted"
                          ? "pill-accepted"
                          : "pill-posted")
                      }
                    >
                      {d.status}
                    </span>
                  </div>
                  <div className="ddc-bottom">
                    <p className="ddc-timer">Best before: {d.bestBefore}</p>
                    <p className="ddc-otp">Pickup OTP: {d.otp}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}