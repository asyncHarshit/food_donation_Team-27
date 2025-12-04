import React, { useState, useEffect } from "react";

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
  const [showNotifications, setShowNotifications] = useState(false);

  // --- Notification State ---
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "New donation: 5kg Rice at MG Road",
      time: "2m ago",
      unread: true,
    },
    {
      id: 2,
      text: "Rescue verified: Hotel Sunrise",
      time: "1h ago",
      unread: false,
    },
    {
      id: 3,
      text: "Urgent: Pickup needed nearby",
      time: "3h ago",
      unread: true,
    },
  ]);

  // Derived state: Count only the unread ones for the badge
  const unreadCount = notifications.filter((n) => n.unread).length;

  // --- Logic to Handle Bell Click ---
  const handleBellClick = () => {
    if (!showNotifications) {
      // If we are OPENING the dropdown, mark all existing notifications as read
      // This immediately clears the red dot
      setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    }
    // Toggle the dropdown visibility
    setShowNotifications(!showNotifications);
  };

  // --- Simulation: New Notification Arrives ---
  useEffect(() => {
    // This timer simulates a new notification arriving after 8 seconds
    // allowing you to see the red dot reactivate.
    const timer = setTimeout(() => {
      const newNotification = {
        id: Date.now(),
        text: "New Alert: Food spoiling soon at City Center!",
        time: "Just now",
        unread: true, // This will trigger the red dot again
      };
      setNotifications((prev) => [newNotification, ...prev]);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

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
    // Outer container: Full width, min-height
    <div className="min-h-screen bg-gray-50 font-sans transition-colors duration-300">
      {/* Top Bar (FoodBridge Branding) */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Name */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                {/* Replaced Lucide Heart with SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FoodBridge
              </span>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-3">
              {/* Notifications Dropdown Container */}
              <div className="relative">
                <button
                  onClick={handleBellClick}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                >
                  {/* Replaced Lucide Bell with SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                  {/* Only show Red Dot if there are unread notifications */}
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"></span>
                  )}
                </button>

                {/* Dropdown Menu */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 transform origin-top-right transition-all">
                    <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                      <span className="font-semibold text-gray-800">
                        Notifications
                      </span>
                      <span className="text-xs text-blue-600 cursor-pointer hover:underline">
                        Mark all read
                      </span>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((note) => (
                        <div
                          key={note.id}
                          className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 ${
                            note.unread ? "bg-blue-50/30" : ""
                          }`}
                        >
                          <p
                            className={`text-sm ${
                              note.unread
                                ? "font-semibold text-gray-800"
                                : "text-gray-600"
                            }`}
                          >
                            {note.text}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {note.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                {/* Replaced Lucide User with SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* PAGE HEADER */}
        <header className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4 sm:gap-0">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">
              Volunteer Dashboard
            </h2>
            <p className="text-base text-gray-500">
              Find nearby food rescues and complete pickups before food spoils.
            </p>
          </div>

          {/* Pills container */}
          <div className="flex gap-3 self-start sm:self-auto flex-wrap">
            {/* Active rescues pill */}
            <div className="group flex items-center gap-1 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 text-sm font-semibold text-gray-700 whitespace-nowrap hover:shadow-md hover:border-blue-200 transition-all duration-300 cursor-default">
              Active rescues{" "}
              <strong className="font-bold ml-1 text-blue-600 group-hover:scale-110 transition-transform duration-200">
                2
              </strong>
            </div>

            {/* Logout Button */}
            <button className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-full shadow-sm border border-red-500 text-sm font-semibold text-white hover:bg-red-600 hover:border-red-600 hover:shadow-md transition-all duration-300 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              Logout
            </button>
          </div>
        </header>

        {/* LOCATION CARD */}
        <section className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 mb-6 hover:border-green-200 transition-colors duration-300">
          <div className="flex items-center">
            {/* location-dot (Animated Pulse) */}
            <div className="relative flex h-3 w-3 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>

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
        <section className="bg-white p-5 rounded-xl shadow-lg border border-gray-100">
          <div className="flex justify-between items-end mb-6 flex-wrap gap-2">
            <h3 className="text-xl font-bold text-gray-900">
              Nearby donations
            </h3>
            <p className="text-sm text-gray-400">Showing within 5 km radius</p>
          </div>

          {/* DONATION CARDS MAPPED */}
          <div className="space-y-4">
            {donations.map((donation) => {
              const bestBeforeTime = formatBestBefore(donation.bestBefore);
              const isExpired = bestBeforeTime === "EXPIRED";

              // Conditional Tailwind classes
              const cardBaseClasses =
                "group bg-gray-50 p-4 rounded-xl border transition-all duration-300 ease-out";
              const cardStateClasses = isExpired
                ? "border-red-200 opacity-70 hover:opacity-100"
                : "border-gray-200 hover:shadow-md hover:-translate-y-1 hover:border-green-200 hover:bg-white";

              const badgeClass = isExpired
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800";

              // Button styles
              const buttonBase =
                "font-bold py-2.5 px-4 rounded-lg text-sm transition-all duration-200 flex justify-center items-center";
              const buttonState = isExpired
                ? "bg-gray-300 text-gray-500 cursor-not-allowed w-full sm:w-auto"
                : "bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow-green-200 active:scale-95 w-full sm:w-auto";

              const buttonText = isExpired ? "Expired" : "Accept Rescue";
              const buttonDisabled = isExpired;

              return (
                <div
                  key={donation.id}
                  className={`${cardBaseClasses} ${cardStateClasses}`}
                >
                  {/* donation-main-info */}
                  <div className="flex items-start mb-4">
                    {/* donation-image-container */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0 border border-gray-200 relative">
                      <img
                        src={donation.imageUrl}
                        alt={donation.foodType}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/60x60/64748b/ffffff?text=N/A";
                        }}
                      />
                    </div>

                    {/* donation-text-info */}
                    <div className="flex-grow min-w-0">
                      <p className="text-lg font-bold text-gray-900 truncate group-hover:text-green-700 transition-colors">
                        {donation.restaurantName}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        <strong className="font-semibold">
                          {donation.foodType}
                        </strong>{" "}
                        • {donation.quantity}
                      </p>
                      <p className="text-xs text-gray-400 mt-1 truncate flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                        {donation.address}
                      </p>
                    </div>
                  </div>

                  {/* donation-row (Badges + Action) */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-3 border-t border-dashed border-gray-200 gap-4 sm:gap-2">
                    {/* badges-row */}
                    <div className="flex gap-2 flex-wrap w-full sm:w-auto">
                      <span className="bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                        {donation.distance}
                      </span>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full border border-transparent whitespace-nowrap ${badgeClass}`}
                      >
                        Best before: {bestBeforeTime}
                      </span>
                    </div>

                    {/* Action buttons - Stacked on mobile, row on desktop */}
                    <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-3 sm:gap-2">
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        className="w-full sm:w-24 h-10 bg-white border border-gray-300 rounded-lg px-3 text-sm text-center focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-400"
                        maxLength="6"
                        disabled={buttonDisabled}
                      />
                      <button
                        className={`${buttonBase} ${buttonState}`}
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
