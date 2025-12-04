import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 rounded-full bg-gradient-to-br from-emerald-500 to-green-400" />
            <span className="font-semibold text-lg text-slate-900">
              FoodBridge
            </span>
          </div>
          <nav className="hidden sm:flex items-center gap-4 text-sm">
            <a href="#how" className="text-slate-600 hover:text-emerald-600">
              How it works
            </a>
            <a href="#impact" className="text-slate-600 hover:text-emerald-600">
              Impact
            </a>
            <a href="#safety" className="text-slate-600 hover:text-emerald-600">
              Safety
            </a>
            <button
              type="button"
              onClick={() => setShowRoleDialog(true)}
              className="px-3 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-100"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setShowRoleDialog(true)}
              className="px-4 py-1.5 rounded-full bg-emerald-600 text-xs font-medium text-white hover:bg-emerald-700"
            >
              Get started
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-4 py-10 md:py-14 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Right hero panel (mobile pe upar) */}
          <div className="order-first md:order-last">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-400/30 blur-3xl rounded-3xl" />
              <div className="relative bg-white rounded-3xl shadow-xl p-5 space-y-4 border border-emerald-50">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center">
                    <span className="text-2xl">🍱</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Active donation
                    </p>
                    <p className="text-base font-semibold text-slate-900">
                      Buffet Dinner · 8 kg
                    </p>
                    <p className="text-xs text-slate-500">
                      Hotel Sunrise · 2.8 km away
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">
                      Time remaining
                    </span>
                    <span className="font-semibold text-red-600">
                      1h 20m left
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full w-2/3 bg-gradient-to-r from-red-500 to-orange-400 rounded-full" />
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>OTP required at pickup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-sky-500" />
                    <span>Secure handover and impact tracking</span>
                  </div>
                </div>

                <button
                  className="w-full mt-1 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
                  type="button"
                >
                  Accept rescue
                </button>
              </div>
            </div>
          </div>

          {/* Left hero copy */}
          <div className="order-last md:order-first space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Food Rescue · Hyper‑local
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-slate-900">
              Save food, feed people,
              <span className="block text-emerald-700">in minutes.</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl">
              Connect restaurants, households and NGOs on one simple platform so
              surplus cooked food is picked up before it turns into waste.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="px-5 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
                type="button"
                onClick={() => {
                  setRole("donor");
                  setShowRoleDialog(true);
                }}
              >
                I have food to donate
              </button>
              <button
                className="px-5 py-2.5 rounded-full border border-emerald-200 text-emerald-800 text-sm font-semibold bg-white hover:bg-emerald-50"
                type="button"
                onClick={() => {
                  setRole("volunteer");
                  setShowRoleDialog(true);
                }}
              >
                I want to volunteer
              </button>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-slate-600 pt-1">
              <div>
                <p className="text-base font-semibold text-slate-900">
                  4,520+
                </p>
                <p>meals saved</p>
              </div>
              <div>
                <p className="text-base font-semibold text-slate-900">
                  1,130 kg
                </p>
                <p>food rescued</p>
              </div>
              <div>
                <p className="text-base font-semibold text-slate-900">120</p>
                <p>active volunteers</p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how"
          className="max-w-6xl mx-auto px-4 py-8 md:py-10 border-t border-slate-200"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
            How FoodBridge works
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Three simple dashboards keep donors, volunteers and NGOs in sync.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                Donor dashboard
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Post surplus food in under 30 seconds with photo and timer.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                Volunteer dashboard
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                See nearby requests, accept one and navigate instantly.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                Admin dashboard
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Verify NGOs, monitor reports and track meals saved.
              </p>
            </div>
          </div>
        </section>

        {/* IMPACT STRIP */}
        <section
          id="impact"
          className="max-w-6xl mx-auto px-4 py-8 grid gap-3 md:grid-cols-2"
        >
          <div className="rounded-2xl bg-emerald-950 text-emerald-50 p-5">
            <h3 className="text-base font-semibold">Real‑time impact</h3>
            <p className="text-xs text-emerald-100 mt-1">
              Every kilogram of food equals 4 meals, so donors and NGOs can see
              their impact instantly.
            </p>
          </div>
          <div className="rounded-2xl bg-emerald-50 text-emerald-900 p-5 border border-emerald-100">
            <h3 className="text-base font-semibold">Hyper‑local logistics</h3>
            <p className="text-xs text-emerald-800 mt-1">
              Volunteers only receive alerts within a practical radius so food
              is always picked up on time.
            </p>
          </div>
        </section>

        {/* SAFETY */}
        <section
          id="safety"
          className="max-w-6xl mx-auto px-4 py-8 md:py-10 border-t border-slate-200"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
            Safety built into every pickup
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                OTP handover
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Secure pickup code ensures the right volunteer gets the food.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                Verified NGOs
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Admin review and approval before NGOs can receive donations.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                Quality checklist
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Mandatory “safe to serve” confirmation and visible expiry
                timer.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-4 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium text-slate-700">FoodBridge</p>
            <p className="text-[11px] text-slate-500">
              A community‑led way to turn surplus food into meals, while cutting
              waste and hunger together.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-[11px] text-slate-500">
            <a href="#how" className="hover:text-emerald-600">
              How it works
            </a>
            <a href="#impact" className="hover:text-emerald-600">
              Impact
            </a>
            <a href="#safety" className="hover:text-emerald-600">
              Safety
            </a>
            <span className="text-slate-400">
              © {new Date().getFullYear()} FoodBridge · Hackathon prototype
            </span>
          </div>
        </div>
      </footer>

      {/* ROLE SELECT DIALOG */}
      {showRoleDialog && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-slate-900">
                Select how you want to use FoodBridge
              </h3>
              <button
                className="text-slate-400 hover:text-slate-600 text-lg"
                type="button"
                onClick={() => setShowRoleDialog(false)}
              >
                ×
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              You can switch roles later — this just opens the right dashboard.
            </p>

            <div className="mt-3 space-y-2">
              {[
                {
                  id: "donor",
                  title: "Donor",
                  desc: "Hotels, restaurants or households with extra food.",
                },
                {
                  id: "volunteer",
                  title: "Volunteer",
                  desc: "Pick up food and deliver it to NGOs or communities.",
                },
                {
                  id: "admin",
                  title: "Admin",
                  desc: "Verify NGOs, view map of donations and handle reports.",
                },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`w-full flex items-start gap-2 rounded-xl border px-3 py-2 text-left text-xs ${
                    role === r.id
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <span className="mt-1 h-3 w-3 rounded-full border border-emerald-500">
                    {role === r.id && (
                      <span className="block h-full w-full rounded-full bg-emerald-500" />
                    )}
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-slate-900">
                      {r.title}
                    </p>
                    <p className="text-[11px] text-slate-600">{r.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-3 flex justify-end gap-2">
              <button
                className="px-3 py-1.5 rounded-full border border-slate-200 text-[11px] text-slate-700 hover:bg-slate-50"
                type="button"
                onClick={() => setShowRoleDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-1.5 rounded-full bg-emerald-600 text-[11px] font-semibold text-white hover:bg-emerald-700"
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
