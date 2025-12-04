import React from "react";

// Helper function to format the 'Best Before' time (simulated data)
const formatBestBefore = (dateString) => {
  // Logic to calculate remaining time
  const now = new Date();
  const bestBefore = new Date(dateString);
  const diffInMinutes = Math.floor((bestBefore - now) / (1000 * 60));

  if (diffInMinutes <= 0) {
    return "EXPIRED";
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  }

  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;

  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
};

// Main App component
const App = () => {
  // --- Simulated Donation Data ---
  const donations = [
    {
      id: 1,
      restaurantName: "Hotel Sunrise",
      foodType: "Buffet Dinner",
      quantity: "8 kg",
      // 1h 20m from now
      bestBefore: new Date(Date.now() + 1000 * 60 * 80).toISOString(),
      address: "MG Road, City Center",
      distance: "3.2 km",
      imageUrl: "https://placehold.co/60x60/334155/ffffff?text=F+1",
    },
    {
      id: 2,
      restaurantName: "Green Leaf Restaurant",
      foodType: "Veg Lunch",
      quantity: "5 kg",
      // 45 mins from now
      bestBefore: new Date(Date.now() + 1000 * 60 * 45).toISOString(),
      address: "Near City Mall",
      distance: "1.1 km",
      imageUrl: "https://placehold.co/60x60/064e3b/ffffff?text=F+2",
    },
    {
      id: 3,
      restaurantName: "Expired Bakery",
      foodType: "Pastries",
      quantity: "2 kg",
      // 15 mins ago (Expired)
      bestBefore: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      address: "Downtown East",
      distance: "5.0 km",
      imageUrl: "https://placehold.co/60x60/7f1d1d/ffffff?text=X",
    },
  ];

  return (
    // Outer container: Responsive padding, light gray background, centered content
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <header className="flex justify-between items-start mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              Volunteer Dashboard
            </h2>
            <p className="text-base text-gray-500">
              Find nearby food rescues and complete pickups before food spoils.
            </p>
          </div>

          {/* Pills container */}
          <div className="flex gap-3">
            {/* Active rescues pill */}
            <div className="flex items-center gap-1 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 text-sm font-semibold text-gray-700 whitespace-nowrap">
              Active rescues <strong className="font-bold ml-1">2</strong>
            </div>
            {/* Radius pill */}
            <div className="flex items-center gap-1 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 text-sm font-semibold text-gray-700 whitespace-nowrap">
              Radius
            </div>
          </div>
        </header>

        {/* LOCATION CARD */}
        <section className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 mb-6">
          <div className="flex items-center">
            {/* location-dot (Green dot with shadow ring) */}
            <span className="h-2.5 w-2.5 bg-green-500 rounded-full mr-3 shadow-md shadow-green-300/50"></span>

            <div>
              <p className="text-base font-semibold text-gray-900">
                Your location
              </p>
              <p className="text-sm text-gray-500 mt-0.5">
                Auto-detected • City Center
              </p>
            </div>
          </div>
        </section>

        {/* DONATIONS SECTION CARD */}
        <section className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
          <div className="flex justify-between items-end mb-4 flex-wrap gap-2">
            <h3 className="text-xl font-bold text-gray-900">
              Nearby donations
            </h3>
            <p className="text-sm text-gray-400">Showing within 5 km radius</p>
          </div>

          {/* DONATION CARDS MAPPED */}
          <div>
            {donations.map((donation) => {
              const bestBeforeTime = formatBestBefore(donation.bestBefore);
              const isExpired = bestBeforeTime === "EXPIRED";

              // Conditional Tailwind classes
              const cardClasses = `bg-gray-50 p-4 rounded-xl shadow-sm border mb-4 last:mb-0 ${
                isExpired ? "border-red-400 opacity-70" : "border-gray-200"
              }`;
              const badgeClass = isExpired
                ? "bg-red-200 text-red-800"
                : "bg-yellow-100 text-yellow-800";
              const buttonClass = isExpired
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-600/30 active:shadow-none active:bg-green-800";
              const buttonText = isExpired ? "Expired" : "Accept Rescue";
              const buttonDisabled = isExpired;

              return (
                <div key={donation.id} className={cardClasses}>
                  {/* donation-main-info */}
                  <div className="flex items-start mb-4">
                    {/* donation-image-container */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0 border border-gray-300">
                      <img
                        src={donation.imageUrl}
                        alt={donation.foodType}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/60x60/64748b/ffffff?text=N/A";
                        }}
                      />
                    </div>

                    {/* donation-text-info */}
                    <div className="flex-grow min-w-0">
                      <p className="text-lg font-bold text-gray-900 truncate">
                        {donation.restaurantName}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        <strong className="font-semibold">
                          {donation.foodType}
                        </strong>{" "}
                        • {donation.quantity}
                      </p>
                      <p className="text-xs text-gray-400 mt-1 truncate">
                        {donation.address}
                      </p>
                    </div>
                  </div>

                  {/* donation-row (Badges + Action) */}
                  <div className="flex justify-between items-center pt-3 border-t border-dashed border-gray-300 flex-wrap gap-3">
                    {/* badges-row */}
                    <div className="flex gap-2 flex-wrap">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {donation.distance}
                      </span>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeClass}`}
                      >
                        Best before: {bestBeforeTime}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        className="w-24 h-10 bg-white border border-gray-300 rounded-lg mr-3 px-3 text-sm text-center focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 disabled:bg-gray-200"
                        maxLength="6"
                        disabled={buttonDisabled}
                      />
                      <button
                        className={`font-bold py-2.5 px-4 rounded-lg text-sm transition duration-150 ${buttonClass}`}
                        disabled={buttonDisabled}
                      >
                        {buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
