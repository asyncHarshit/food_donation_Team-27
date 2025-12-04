import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [role, setRole] = useState("donor");

  const goToDashboard = () => {
    if (role === "donor") {
      navigate("/donor");
    } else if (role === "volunteer") {
      navigate("/volunteer");
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="lp-root">
      {/* HEADER / NAVBAR */}
      <header className="lp-nav lp-nav-shadow">
        <div className="lp-nav-inner">
          <div className="lp-brand">
            <span className="lp-logo-dot" />
            <span className="lp-logo-text">FoodBridge</span>
          </div>
          <nav className="lp-nav-links">
            <a href="#how">How it works</a>
            <a href="#impact">Impact</a>
            <a href="#safety">Safety</a>
            <button
              className="lp-btn-ghost"
              type="button"
              onClick={() => setShowRoleDialog(true)}
            >
              Login
            </button>
            <button
              className="lp-btn-primary"
              type="button"
              onClick={() => setShowRoleDialog(true)}
            >
              Get started
            </button>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="lp-hero">
        <div className="lp-hero-left">
          <span className="lp-pill">Food Rescue · Hyper-local</span>
          <h1>Save food, feed people, in minutes.</h1>
          <p>
            Connect restaurants, households and NGOs on one simple platform so
            surplus cooked food is picked up before it turns into waste.
          </p>

          <div className="lp-hero-actions">
            <button
              className="lp-btn-primary"
              type="button"
              onClick={() => {
                setRole("donor");
                setShowRoleDialog(true);
              }}
            >
              I have food to donate
            </button>
            <button
              className="lp-btn-outline"
              type="button"
              onClick={() => {
                setRole("volunteer");
                setShowRoleDialog(true);
              }}
            >
              I want to volunteer
            </button>
          </div>

          <div className="lp-hero-stats">
            <div>
              <strong>4,520+</strong>
              <span>meals saved</span>
            </div>
            <div>
              <strong>1,130 kg</strong>
              <span>food rescued</span>
            </div>
            <div>
              <strong>120</strong>
              <span>active volunteers</span>
            </div>
          </div>
        </div>

        <div className="lp-hero-right">
          <div className="lp-panel">
            <div className="lp-panel-header">
              <span className="dot-green" />
              <span>Live nearby donations</span>
            </div>
            <div className="lp-panel-card">
              <div className="lp-panel-row">
                <div>
                  <h3>Buffet Dinner • 8 kg</h3>
                  <p className="lp-panel-meta">Hotel Sunrise · 2.8 km</p>
                </div>
                <span className="lp-badge-time">1h 20m left</span>
              </div>
              <p className="lp-panel-note">
                Volunteer gets OTP at pickup for secure handover.
              </p>
              <button className="lp-btn-primary full-width" type="button">
                Accept rescue
              </button>
            </div>
            <div className="lp-panel-footer">
              Geo-fenced alerts • OTP verification • Impact tracking
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="lp-section">
        <h2>How FoodBridge works</h2>
        <p className="lp-section-sub">
          Three simple dashboards keep donors, volunteers and NGOs in sync.
        </p>
        <div className="lp-grid-3">
          <div className="lp-card">
            <h3>Donor dashboard</h3>
            <p>Post surplus food in under 30 seconds with photo and timer.</p>
          </div>
          <div className="lp-card">
            <h3>Volunteer dashboard</h3>
            <p>See nearby requests, accept one and navigate instantly.</p>
          </div>
          <div className="lp-card">
            <h3>Admin dashboard</h3>
            <p>Verify NGOs, monitor reports and track meals saved.</p>
          </div>
        </div>
      </section>

      {/* IMPACT STRIP */}
      <section id="impact" className="lp-impact">
        <div className="lp-impact-card">
          <h3>Real-time impact</h3>
          <p>
            Every kilogram of food equals 4 meals, so donors and NGOs can see
            their impact instantly.
          </p>
        </div>
        <div className="lp-impact-card">
          <h3>Hyper-local logistics</h3>
          <p>
            Volunteers only receive alerts within a practical radius so food is
            always picked up on time.
          </p>
        </div>
      </section>

      {/* SAFETY */}
      <section id="safety" className="lp-section">
        <h2>Safety built into every pickup</h2>
        <div className="lp-grid-3">
          <div className="lp-card">
            <h3>OTP handover</h3>
            <p>Secure pickup code ensures the right volunteer gets the food.</p>
          </div>
          <div className="lp-card">
            <h3>Verified NGOs</h3>
            <p>Admin review and approval before NGOs can receive donations.</p>
          </div>
          <div className="lp-card">
            <h3>Quality checklist</h3>
            <p>Mandatory “safe to serve” confirmation and visible expiry timer.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-left">
            <span className="lp-logo-text">FoodBridge</span>
            <p>
              A community-led way to turn surplus food into meals, while cutting
              waste and hunger together.
            </p>
          </div>
          <div className="lp-footer-links">
            <div>
              <h4>Product</h4>
              <a href="#how">How it works</a>
              <a href="#impact">Impact</a>
            </div>
            <div>
              <h4>For teams</h4>
              <span>Donors</span>
              <span>Volunteers</span>
              <span>NGOs & Admins</span>
            </div>
          </div>
        </div>
        <div className="lp-footer-bottom">
          <span>
            © {new Date().getFullYear()} FoodBridge · Hackathon prototype
          </span>
        </div>
      </footer>

      {/* ROLE SELECT DIALOG */}
      {showRoleDialog && (
        <div className="lp-dialog-backdrop">
          <div className="lp-dialog">
            <div className="lp-dialog-header">
              <h3>Select how you want to use FoodBridge</h3>
              <button
                className="lp-dialog-close"
                type="button"
                onClick={() => setShowRoleDialog(false)}
              >
                ✕
              </button>
            </div>
            <p className="lp-dialog-sub">
              You can switch roles later — this just opens the right dashboard.
            </p>

            <div className="lp-role-list">
              <label
                className={
                  role === "donor" ? "lp-role-card active" : "lp-role-card"
                }
              >
                <input
                  type="radio"
                  name="role"
                  value="donor"
                  checked={role === "donor"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <div>
                  <h4>Donor</h4>
                  <p>Hotels, restaurants or households with extra food.</p>
                </div>
              </label>

              <label
                className={
                  role === "volunteer" ? "lp-role-card active" : "lp-role-card"
                }
              >
                <input
                  type="radio"
                  name="role"
                  value="volunteer"
                  checked={role === "volunteer"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <div>
                  <h4>Volunteer</h4>
                  <p>Pick up food and deliver it to NGOs or communities.</p>
                </div>
              </label>

              <label
                className={
                  role === "admin" ? "lp-role-card active" : "lp-role-card"
                }
              >
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <div>
                  <h4>Admin</h4>
                  <p>Verify NGOs, view map of donations and handle reports.</p>
                </div>
              </label>
            </div>

            <div className="lp-dialog-actions">
              <button
                className="lp-btn-ghost"
                type="button"
                onClick={() => setShowRoleDialog(false)}
              >
                Cancel
              </button>
              <button
                className="lp-btn-primary"
                type="button"
                onClick={() => {
                  goToDashboard();
                  setShowRoleDialog(false);
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
