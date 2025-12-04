import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Users, MapPin, Clock, Shield, TrendingUp, Heart, Phone, Mail, ChevronDown, CheckCircle } from 'lucide-react';

export default function FoodBridgeLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeRole, setActiveRole] = useState('donor');
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState('donor');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToDashboard = () => {
    if (selectedRole === 'donor') {
      alert('Navigating to Donor Dashboard...');
      // In real app: navigate('/donor');
    } else if (selectedRole === 'volunteer') {
      alert('Navigating to Volunteer Dashboard...');
      // In real app: navigate('/volunteer');
    } else {
      alert('Navigating to Admin Dashboard...');
      // In real app: navigate('/admin');
    }
  };

  const stats = [
    { value: '4,520+', label: 'Meals Saved', icon: Heart },
    { value: '1,130kg', label: 'Food Rescued', icon: Users },
    { value: '120', label: 'Active Volunteers', icon: MapPin },
    { value: '<30min', label: 'Avg. Pickup Time', icon: Clock }
  ];

  const features = [
    {
      icon: Clock,
      title: 'Real-Time Coordination',
      description: 'Instant notifications and live tracking ensure food reaches those in need before it spoils.'
    },
    {
      icon: MapPin,
      title: 'Geo-Fenced Matching',
      description: 'Smart radius-based alerts connect donors with the nearest volunteers for maximum efficiency.'
    },
    {
      icon: Shield,
      title: 'Verified & Safe',
      description: 'OTP verification and NGO vetting ensure every transaction is secure and trustworthy.'
    },
    {
      icon: TrendingUp,
      title: 'Impact Analytics',
      description: 'Track your contribution with detailed metrics and earn badges for your social impact.'
    }
  ];

  const userFlows = {
    donor: [
      { step: '01', title: 'Post Donation', desc: 'Add food details, quantity, and photo in under 30 seconds' },
      { step: '02', title: 'Get Matched', desc: 'Nearby volunteers receive instant notifications' },
      { step: '03', title: 'Quick Handover', desc: 'Verify pickup with secure OTP system' },
      { step: '04', title: 'Track Impact', desc: 'See how many meals you\'ve saved' }
    ],
    volunteer: [
      { step: '01', title: 'Receive Alert', desc: 'Get notified of donations within your radius' },
      { step: '02', title: 'Claim Pickup', desc: 'Accept the donation to lock it' },
      { step: '03', title: 'Navigate', desc: 'Follow optimized route to donor location' },
      { step: '04', title: 'Distribute', desc: 'Deliver food and update status with proof' }
    ],
    ngo: [
      { step: '01', title: 'Get Verified', desc: 'Complete one-time NGO verification process' },
      { step: '02', title: 'Monitor Feed', desc: 'View all active donations in your area' },
      { step: '03', title: 'Coordinate Team', desc: 'Assign volunteers to pickup requests' },
      { step: '04', title: 'Report Impact', desc: 'Share distribution photos and metrics' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FoodBridge
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">How it works</a>
              <a href="#impact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Impact</a>
              <a href="#safety" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Safety</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
              <button 
                onClick={() => setShowRoleDialog(true)}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Login
              </button>
              <button 
                onClick={() => setShowRoleDialog(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:scale-105 transition-all font-medium">
                Get Started
              </button>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-6 py-4 space-y-3">
              <a href="#how" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">How it works</a>
              <a href="#impact" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Impact</a>
              <a href="#safety" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Safety</a>
              <a href="#contact" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
              <button 
                onClick={() => setShowRoleDialog(true)}
                className="block w-full text-left text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Login
              </button>
              <button 
                onClick={() => setShowRoleDialog(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-full font-medium">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                  🍽️ Food Rescue · Hyper-local
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Save food, feed people,
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  in minutes.
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect restaurants, households and NGOs on one simple platform so 
                surplus cooked food is picked up before it turns into waste.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => {
                    setSelectedRole('donor');
                    setShowRoleDialog(true);
                  }}
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center">
                  I have food to donate
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => {
                    setSelectedRole('volunteer');
                    setShowRoleDialog(true);
                  }}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all">
                  I want to volunteer
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-700">Live nearby donations</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Buffet Dinner • 8 kg</h3>
                      <p className="text-gray-600 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        Hotel Sunrise · 2.8 km
                      </p>
                    </div>
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                      1h 20m left
                    </span>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4">
                    <p className="text-sm text-gray-700 mb-2">
                      🔒 Volunteer gets OTP at pickup for secure handover.
                    </p>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                    Accept rescue
                  </button>
                </div>

                <div className="border-t pt-4">
                  <p className="text-xs text-gray-500 text-center">
                    Geo-fenced alerts • OTP verification • Impact tracking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center group hover:scale-105 transition-transform">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-4 group-hover:shadow-lg transition-shadow">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How FoodBridge works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple dashboards keep donors, volunteers and NGOs in sync.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Donor dashboard</h3>
              <p className="text-gray-600 leading-relaxed">Post surplus food in under 30 seconds with photo and timer.</p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Volunteer dashboard</h3>
              <p className="text-gray-600 leading-relaxed">See nearby requests, accept one and navigate instantly.</p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Admin dashboard</h3>
              <p className="text-gray-600 leading-relaxed">Verify NGOs, monitor reports and track meals saved.</p>
            </div>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Choose your role to see the flow</h3>
          </div>

          <div className="flex justify-center mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-1 inline-flex shadow-lg">
              {['donor', 'volunteer', 'ngo'].map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className={`px-8 py-3 rounded-full font-semibold transition-all ${
                    activeRole === role
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {role === 'donor' ? 'Donor' : role === 'volunteer' ? 'Volunteer' : 'NGO'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userFlows[activeRole].map((flow, idx) => (
              <div key={idx} className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="text-6xl font-bold text-blue-600/20 mb-4">{flow.step}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{flow.title}</h3>
                <p className="text-gray-600">{flow.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 px-6 bg-gradient-to-br from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 text-white">
              <h2 className="text-4xl font-bold mb-6">Real-time impact</h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Every kilogram of food equals 4 meals, so donors and NGOs can see 
                their impact instantly.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" fill="white" />
                  </div>
                  <div>
                    <p className="font-bold text-white">2 Million Meals</p>
                    <p className="text-blue-100">Saved from waste</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white">500 Tons CO₂</p>
                    <p className="text-blue-100">Environmental impact prevented</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 text-white">
              <h2 className="text-4xl font-bold mb-6">Hyper-local logistics</h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                Volunteers only receive alerts within a practical radius so food is 
                always picked up on time.
              </p>
              <div className="mt-8 bg-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold">Average Response Time</span>
                  <span className="text-2xl font-bold">18 min</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section id="safety" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Safety built into <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">every pickup</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Multiple layers of verification ensure food reaches the right people safely
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">OTP handover</h3>
              <p className="text-gray-600 leading-relaxed">Secure pickup code ensures the right volunteer gets the food.</p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Verified NGOs</h3>
              <p className="text-gray-600 leading-relaxed">Admin review and approval before NGOs can receive donations.</p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Quality checklist</h3>
              <p className="text-gray-600 leading-relaxed">Mandatory "safe to serve" confirmation and visible expiry timer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" fill="white" />
                </div>
                <span className="text-xl font-bold text-white">FoodBridge</span>
              </div>
              <p className="text-gray-400">
                Connecting surplus food with those who need it most.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#how" className="block hover:text-white transition-colors">How It Works</a>
                <a href="#impact" className="block hover:text-white transition-colors">Impact</a>
                <a href="#safety" className="block hover:text-white transition-colors">Safety</a>
                <a href="#" className="block hover:text-white transition-colors">Blog</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Get Involved</h4>
              <div className="space-y-2">
                <a href="#" onClick={() => { setSelectedRole('donor'); setShowRoleDialog(true); }} className="block hover:text-white transition-colors">Become a Donor</a>
                <a href="#" onClick={() => { setSelectedRole('volunteer'); setShowRoleDialog(true); }} className="block hover:text-white transition-colors">Volunteer</a>
                <a href="#" onClick={() => { setSelectedRole('admin'); setShowRoleDialog(true); }} className="block hover:text-white transition-colors">Partner NGO</a>
                <a href="#" className="block hover:text-white transition-colors">Corporate Partnership</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>help@foodbridge.org</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} FoodBridge · Prototype for food donation & pickup coordination · Built with ❤️ for a hunger-free world.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
