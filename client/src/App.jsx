import React, { useState, useEffect } from 'react';
import { Heart, TrendingUp, Clock, MapPin, Check, AlertCircle, Upload, Award, Menu, Bell, User, LogOut, Home, ChevronRight, Camera, Loader, Navigation } from 'lucide-react';

const PRESETS = [
    { id: 1, label: "Regular Dinner • 10 kg", foodType: "Mixed Buffet Dinner", qty: 10 },
    { id: 2, label: "Lunch • 5 kg", foodType: "Veg Thali Lunch", qty: 5 },
];

const MOCK_DONATIONS = [
    {
        id: 1,
        foodType: "Buffet Dinner",
        quantity: "8 kg",
        status: "pending",
        bestBefore: new Date(Date.now() + 5000000).toISOString(),
        createdAt: "Today • 7:30 PM",
        otp: "4829",
        imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
        location: {
            address: "Hotel Sunrise, MG Road"
        }
    },
    {
        id: 2,
        foodType: "Veg Lunch",
        quantity: "5 kg",
        status: "claimed",
        bestBefore: new Date(Date.now() + 2700000).toISOString(),
        createdAt: "Today • 1:00 PM",
        otp: "7391",
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
        claimedBy: { name: "Ramesh Kumar" },
        location: {
            address: "Green Valley Restaurant"
        }
    },
];

// Renamed and made a regular function: this holds all the dashboard logic.
function DashboardContent() { 
    const [form, setForm] = useState({
        foodType: "",
        quantity: "",
        bestBeforeHours: "2",
        notes: "",
        presetId: null,
        imageFile: null,
        imagePreview: null,
    });

    const [location, setLocation] = useState({
        coordinates: null,
        address: "",
        loading: false,
        error: null,
    });

    const [donations] = useState(MOCK_DONATIONS);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const totalMealsSaved = 320;
    const totalDonations = 18;

    // Auto-detect location on component mount
    useEffect(() => {
        detectLocation();
    }, []);

    const detectLocation = () => {
        setLocation(prev => ({ ...prev, loading: true, error: null }));

        if (!navigator.geolocation) {
            setLocation(prev => ({ 
                ...prev, 
                loading: false, 
                error: "Geolocation is not supported by your browser" 
            }));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                // In real app, use reverse geocoding API to get address
                // For demo, using mock address
                const mockAddress = "Current Location, Mathura, UP";

                setLocation({
                    coordinates: [longitude, latitude],
                    address: mockAddress,
                    loading: false,
                    error: null,
                });
            },
            (error) => {
                setLocation(prev => ({ 
                    ...prev, 
                    loading: false, 
                    error: "Unable to retrieve your location" 
                }));
            }
        );
    };

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

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("Image size should be less than 5MB");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setForm(prev => ({
                    ...prev,
                    imageFile: file,
                    imagePreview: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setForm(prev => ({
            ...prev,
            imageFile: null,
            imagePreview: null,
        }));
    };

    const handleSubmit = async () => {
        // Validation
        if (!form.foodType || !form.quantity) {
            alert("Please fill in all required fields");
            return;
        }

        if (!form.imageFile) {
            alert("Please upload a food image");
            return;
        }

        if (!location.coordinates) {
            alert("Location not detected. Please enable location services.");
            return;
        }

        setIsSubmitting(true);

        // Simulate API call delay
        setTimeout(() => {
            const donationData = {
                foodType: form.foodType,
                quantity: form.quantity,
                bestBefore: new Date(Date.now() + parseInt(form.bestBeforeHours) * 3600000),
                imageUrl: form.imagePreview, // In real app: uploaded URL
                location: {
                    type: "Point",
                    coordinates: location.coordinates,
                    address: location.address,
                },
                status: "pending",
                otp: Math.floor(1000 + Math.random() * 9000).toString(),
            };

            console.log("Donation Data to Submit:", donationData);
            alert("Donation posted successfully! 🎉");

            // Reset form
            setForm({
                foodType: "",
                quantity: "",
                bestBeforeHours: "2",
                notes: "",
                presetId: null,
                imageFile: null,
                imagePreview: null,
            });
            setIsSubmitting(false);
        }, 1500);
    };

    const getTimeRemaining = (bestBefore) => {
        const now = new Date();
        const end = new Date(bestBefore);
        const diff = end - now;

        if (diff <= 0) return "Expired";

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (hours > 0) return `${hours}h ${minutes}m`;
        return `${minutes}m`;
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: { bg: "bg-blue-100", text: "text-blue-800", label: "Posted" },
            claimed: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Claimed" },
            picked: { bg: "bg-purple-100", text: "text-purple-800", label: "Picked Up" },
            distributed: { bg: "bg-green-100", text: "text-green-800", label: "Distributed" },
            expired: { bg: "bg-red-100", text: "text-red-800", label: "Expired" },
        };
        const badge = badges[status] || badges.pending;
        return (
            <span className={`text-xs px-2 py-1 rounded-full ${badge.bg} ${badge.text}`}>
                {badge.label}
            </span>
        );
    };

    // Return the main content of the dashboard
    return (
        <div className="max-w-6xl mx-auto px-6 py-6">
            {/* Header with Badges */}
            <div className="flex justify-between items-start gap-4 mb-6 flex-wrap">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Donor Dashboard</h1>
                    <p className="text-sm text-gray-600">
                        Post surplus food in under 30 seconds and track every pickup.
                    </p>
                </div>

                <div className="flex gap-3">
                    <div className="bg-white rounded-full px-4 py-2 shadow-md flex flex-col items-center min-w-[100px]">
                        <span className="text-xs text-gray-600">Meals saved</span>
                        <span className="text-lg font-semibold text-gray-900">{totalMealsSaved}</span>
                    </div>
                    <div className="bg-green-50 rounded-full px-4 py-2 shadow-md flex flex-col items-center min-w-[100px]">
                        <span className="text-xs text-gray-600">Total donations</span>
                        <span className="text-lg font-semibold text-gray-900">{totalDonations}</span>
                    </div>
                </div>
            </div>

            {/* Quick Donate Card */}
            <div className="bg-white rounded-2xl p-5 shadow-lg mb-5">
                <h2 className="text-lg font-bold text-gray-900 mb-1">Quick Donate</h2>
                <p className="text-sm text-gray-600 mb-3">
                    Fill food details and upload a photo. Location is being auto-detected.
                </p>

                {/* Location Status */}
                <div className={`mb-4 p-3 rounded-xl border-2 ${
                    location.coordinates ? 'border-green-300 bg-green-50' : 
                    location.loading ? 'border-blue-300 bg-blue-50' : 
                    'border-red-300 bg-red-50'
                }`}>
                    <div className="flex items-center gap-2">
                        {location.loading ? (
                            <>
                                <Loader className="w-4 h-4 text-blue-600 animate-spin" />
                                <span className="text-sm text-blue-700">Detecting your location...</span>
                            </>
                        ) : location.coordinates ? (
                            <>
                                <MapPin className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-green-700">📍 {location.address}</span>
                            </>
                        ) : (
                            <>
                                <AlertCircle className="w-4 h-4 text-red-600" />
                                <span className="text-sm text-red-700">{location.error}</span>
                                <button 
                                    onClick={detectLocation}
                                    className="ml-auto text-xs text-blue-600 underline"
                                >
                                    Retry
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Preset Buttons */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {PRESETS.map((p) => (
                        <button
                            key={p.id}
                            type="button"
                            onClick={() => handlePreset(p)}
                            className={`text-xs px-3 py-2 rounded-full border transition-all ${
                                form.presetId === p.id
                                    ? 'border-green-600 bg-green-50 text-green-800'
                                    : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-green-400'
                            }`}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>

                {/* Form Fields */}
                <div className="space-y-3">
                    {/* Image Upload */}
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Food Image *</label>
                        {!form.imagePreview ? (
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-green-500 transition-colors bg-gray-50">
                                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-600">Click to upload food image</span>
                                <span className="text-xs text-gray-500 mt-1">Max 5MB (JPG, PNG)</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        ) : (
                            <div className="relative">
                                <img 
                                    src={form.imagePreview} 
                                    alt="Food preview" 
                                    className="w-full h-48 object-cover rounded-xl"
                                />
                                <button
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                >
                                    <AlertCircle className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3 flex-wrap">
                        <div className="flex-1 min-w-[180px]">
                            <label className="block text-xs text-gray-600 mb-1">Food type *</label>
                            <input
                                type="text"
                                placeholder="e.g. Veg Biryani, Roti, Dal"
                                value={form.foodType}
                                onChange={(e) => handleChange("foodType", e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            />
                        </div>
                        <div className="flex-1 min-w-[180px]">
                            <label className="block text-xs text-gray-600 mb-1">Quantity (kg) *</label>
                            <input
                                type="number"
                                min="1"
                                placeholder="e.g. 5"
                                value={form.quantity}
                                onChange={(e) => handleChange("quantity", e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                        <div className="flex-1 min-w-[180px]">
                            <label className="block text-xs text-gray-600 mb-1">Best before (hours) *</label>
                            <select
                                value={form.bestBeforeHours}
                                onChange={(e) => handleChange("bestBeforeHours", e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-white"
                            >
                                <option value="1">1 hour</option>
                                <option value="2">2 hours</option>
                                <option value="3">3 hours</option>
                                <option value="4">4 hours</option>
                                <option value="6">6 hours</option>
                            </select>
                        </div>
                        <div className="flex-1 min-w-[180px]">
                            <label className="block text-xs text-gray-600 mb-1">Notes (optional)</label>
                            <input
                                type="text"
                                placeholder="Less spicy, contains dairy, etc."
                                value={form.notes}
                                onChange={(e) => handleChange("notes", e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            />
                        </div>
                    </div>

                    <div className="text-sm text-gray-700">
                        <label className="flex items-start gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                required
                                className="mt-0.5 w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                            />
                            <span>Food was cooked within safe time and stored hygienically.</span>
                        </label>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !location.coordinates}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader className="w-4 h-4 animate-spin" />
                                <span>Posting...</span>
                            </>
                        ) : (
                            <>
                                <Upload className="w-4 h-4" />
                                <span>Post Donation</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Active Donations List */}
            <div className="bg-white rounded-2xl p-5 shadow-lg">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-bold text-gray-900">Your active donations</h2>
                    <span className="text-sm text-gray-600">{donations.length} listed</span>
                </div>

                {donations.length === 0 ? (
                    <p className="text-sm text-gray-600 py-4">
                        No active donations. Post your first donation above.
                    </p>
                ) : (
                    <div className="space-y-3 mt-3">
                        {donations.map((d) => (
                            <article
                                key={d.id}
                                className="border border-gray-300 rounded-xl overflow-hidden bg-gray-50"
                            >
                                <div className="flex gap-3 p-3">
                                    {/* Food Image */}
                                    <img 
                                        src={d.imageUrl} 
                                        alt={d.foodType}
                                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex-1">
                                                <h3 className="text-base font-semibold text-gray-900">{d.foodType}</h3>
                                                <p className="text-xs text-gray-600 mt-0.5">
                                                    {d.quantity} • {d.createdAt}
                                                </p>
                                                <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {d.location.address}
                                                </p>
                                            </div>
                                            {getStatusBadge(d.status)}
                                        </div>

                                        <div className="flex justify-between items-center text-xs mt-2 gap-2">
                                            <div className="bg-orange-100 px-2 py-1 rounded">
                                                <span className="text-orange-800">⏰ {getTimeRemaining(d.bestBefore)}</span>
                                            </div>
                                            <div className="bg-indigo-100 px-2 py-1 rounded">
                                                <span className="text-indigo-800 font-medium">OTP: {d.otp}</span>
                                            </div>
                                        </div>

                                        {d.claimedBy && (
                                            <p className="text-xs text-gray-600 mt-2">
                                                Claimed by: <span className="font-medium">{d.claimedBy.name}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {d.status === "claimed" && (
                                    <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 text-sm font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>Track Volunteer</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                )}
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// FINAL default export function (The main App component)
export default function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                                <Heart className="w-6 h-6 text-white" fill="white" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                FoodBridge
                            </span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                                <Bell className="w-5 h-5 text-gray-600" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <User className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content: Render the dashboard content here */}
            <DashboardContent />
        </div>
    );
}