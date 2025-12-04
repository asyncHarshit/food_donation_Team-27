import React from "react";

const donations = [
  {
    id: "DNT-1023",
    donorName: "Hotel Sunrise",
    foodType: "Buffet Dinner",
    quantity: "8 kg",
    bestBefore: "2025-12-04T21:00:00Z",
    location: {
      address: "MG Road, Bangalore",
      coordinates: [77.5946, 12.9716], // [lng, lat]
    },
    status: "pending",
    claimedByName: null,
    otp: "824539",
    distributedProofImage:
      "https://images.example.com/distribution/dnt-1023-proof.jpg",
    createdAt: "2025-12-04T15:30:00Z",
  },
  {
    id: "DNT-1018",
    donorName: "Green Leaf Restaurant",
    foodType: "Veg Thali",
    quantity: "20 plates",
    bestBefore: "2025-12-04T20:00:00Z",
    location: {
      address: "Kothrud, Pune",
      coordinates: [73.8077, 18.5074],
    },
    status: "claimed",
    claimedByName: "Rohan (Volunteer)",
    otp: "563210",
    distributedProofImage: "",
    createdAt: "2025-12-04T14:00:00Z",
  },
  {
    id: "DNT-1005",
    donorName: "Family Home",
    foodType: "Home-cooked lunch",
    quantity: "6 plates",
    bestBefore: "2025-12-03T15:00:00Z",
    location: {
      address: "Indiranagar, Bangalore",
      coordinates: [77.6408, 12.9719],
    },
    status: "distributed",
    claimedByName: "Helping Hands NGO",
    otp: "219834",
    distributedProofImage:
      "https://images.example.com/distribution/dnt-1005-proof.jpg",
    createdAt: "2025-12-03T11:30:00Z",
  },
];

const statusColors = {
  pending:
    "bg-amber-50 text-amber-800 border border-amber-200",
  claimed:
    "bg-sky-50 text-sky-800 border border-sky-200",
  picked:
    "bg-indigo-50 text-indigo-800 border border-indigo-200",
  distributed:
    "bg-emerald-50 text-emerald-800 border border-emerald-200",
  expired:
    "bg-rose-50 text-rose-800 border border-rose-200",
};

function formatDate(dateString) {
  const d = new Date(dateString);
  return d.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminLayout() {
  const totalDonations = donations.length;
  const totalDistributed = donations.filter(
    (d) => d.status === "distributed"
  ).length;
  const totalPending = donations.filter(
    (d) => d.status === "pending"
  ).length;
  const totalClaimed = donations.filter(
    (d) => d.status === "claimed"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* LEFT SIDEBAR */}
      <aside className="hidden md:flex md:flex-col w-60 bg-slate-950 text-slate-100">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-emerald-400" />
          <span className="font-semibold text-lg">FoodBridge Admin</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          <a
            href="#overview"
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-slate-800 text-slate-50"
          >
            Overview
          </a>
          <a
            href="#donations"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-slate-300 hover:bg-slate-800/60"
          >
            Donations
          </a>
          <a
            href="#map"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-slate-300 hover:bg-slate-800/60"
          >
            Map view
          </a>
        </nav>
        <div className="px-4 py-3 border-t border-slate-800 text-xs text-slate-500">
          v1.0 • Donation admin
        </div>
      </aside>

      {/* MAIN COLUMN */}
      <div className="flex-1 flex flex-col">
        {/* TOP HEADER */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-slate-900">
                Donation Dashboard
              </h1>
              <p className="text-xs text-slate-500">
                Monitor live donations, status changes and distribution proofs.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>System healthy</span>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-4 space-y-4">
          {/* OVERVIEW CARDS */}
          <section
            id="overview"
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-5"
          >
            <h2 className="text-base md:text-lg font-semibold text-slate-900">
              Overview
            </h2>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Snapshot of current donations based on status field
              (pending, claimed, picked, distributed, expired).
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-3">
                <p className="text-xs text-slate-500">Total donations</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">
                  {totalDonations}
                </p>
              </div>
              <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-3">
                <p className="text-xs text-emerald-700">
                  Distributed (status = distributed)
                </p>
                <p className="mt-1 text-xl font-semibold text-emerald-900">
                  {totalDistributed}
                </p>
              </div>
              <div className="rounded-lg bg-amber-50 border border-amber-100 px-3 py-3">
                <p className="text-xs text-amber-700">
                  Waiting (status = pending)
                </p>
                <p className="mt-1 text-xl font-semibold text-amber-900">
                  {totalPending}
                </p>
              </div>
              <div className="rounded-lg bg-sky-50 border border-sky-100 px-3 py-3">
                <p className="text-xs text-sky-700">
                  Claimed (status = claimed)
                </p>
                <p className="mt-1 text-xl font-semibold text-sky-900">
                  {totalClaimed}
                </p>
              </div>
            </div>
          </section>

          {/* DONATION LIST TABLE */}
          <section
            id="donations"
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-5"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div>
                <h2 className="text-base md:text-lg font-semibold text-slate-900">
                  Latest donations
                </h2>
                <p className="text-xs md:text-sm text-slate-500">
                  Based directly on Donation schema: foodType, quantity,
                  bestBefore, location.address, status, OTP, proof image.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-xs md:text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-500">
                    <th className="px-2 py-2 text-left font-medium">
                      Donation
                    </th>
                    <th className="px-2 py-2 text-left font-medium">
                      Food & Qty
                    </th>
                    <th className="px-2 py-2 text-left font-medium">
                      Location
                    </th>
                    <th className="px-2 py-2 text-left font-medium">
                      Best before
                    </th>
                    <th className="px-2 py-2 text-left font-medium">
                      Status
                    </th>
                    <th className="px-2 py-2 text-left font-medium">
                      Claimed by
                    </th>
                    <th className="px-2 py-2 text-left font-medium">OTP</th>
                    <th className="px-2 py-2 text-left font-medium">
                      Proof
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((d) => (
                    <tr
                      key={d.id}
                      className="border-t border-slate-100 hover:bg-slate-50/60 align-top"
                    >
                      <td className="px-2 py-2">
                        <div className="font-semibold text-slate-900">
                          {d.id}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Donor: {d.donorName}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Created: {formatDate(d.createdAt)}
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <div className="text-[13px] font-medium text-slate-900">
                          {d.foodType}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {d.quantity}
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <div className="text-[12px] text-slate-800">
                          {d.location.address}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          lng: {d.location.coordinates[0]}, lat:{" "}
                          {d.location.coordinates[1]}
                        </div>
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <div className="text-[12px] text-slate-800">
                          {formatDate(d.bestBefore)}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          bestBefore (schema Date)
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${
                            statusColors[d.status] || "bg-slate-100"
                          }`}
                        >
                          {d.status}
                        </span>
                      </td>
                      <td className="px-2 py-2">
                        {d.claimedByName ? (
                          <span className="text-[12px] text-slate-800">
                            {d.claimedByName}
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400">
                            Not claimed
                          </span>
                        )}
                      </td>
                      <td className="px-2 py-2">
                        <span className="inline-flex items-center rounded-md bg-slate-900 text-slate-50 px-2 py-0.5 text-[11px] font-mono">
                          {d.otp}
                        </span>
                      </td>
                      <td className="px-2 py-2">
                        {d.distributedProofImage ? (
                          <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-800">
                            Uploaded
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                            Not uploaded
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* SIMPLE MAP PLACEHOLDER (GEOJSON) */}
          <section
            id="map"
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-5 mb-4"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div>
                <h2 className="text-base md:text-lg font-semibold text-slate-900">
                  Geo‑location overview
                </h2>
                <p className="text-xs md:text-sm text-slate-500">
                  Uses Donation.location (type: &quot;Point&quot;,
                  coordinates [lng, lat]) and 2dsphere index in the backend.
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                Schema field: location
              </span>
            </div>
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 h-56 flex flex-col items-center justify-center text-xs md:text-sm text-slate-500">
              <p>Map placeholder – display donation pins using location.coordinates.</p>
              <p className="text-[11px] text-slate-400">
                Backend: Donation schema with location: &#123; type: &quot;Point&quot;, coordinates: [lng, lat] &#125; and 2dsphere index.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

