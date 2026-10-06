import { useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import { useTheme } from "../context/ThemeContext";

function Profile() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic",
      quality: "Good",
      resolution: "480p",
      price: "₹199",
    },
    {
      name: "Standard",
      quality: "Better",
      resolution: "1080p",
      price: "₹499",
      current: true,
    },
    {
      name: "Premium",
      quality: "Best",
      resolution: "4K+HDR",
      price: "₹649",
    },
  ];

  const handleSignOut = () => {
    // Add your sign out logic here
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Nav />

      <div className="pt-24 px-4 md:px-12 pb-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Account
          </h1>

          {/* User Info Section */}
          <div className="bg-gray-800 rounded-lg p-6 md:p-8 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-700 pb-6">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <img
                  className="w-20 h-20 rounded"
                  src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                  alt="Avatar"
                />
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    User Name
                  </h2>
                  <p className="text-gray-400">user@example.com</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white px-6 py-2 rounded font-semibold hover:bg-red-700 transition"
              >
                Sign Out
              </button>
            </div>

            {/* Membership Details */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Membership & Billing
              </h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Member since:</span>
                  <span className="text-white">January 2024</span>
                </div>
                <div className="flex justify-between">
                  <span>Next billing date:</span>
                  <span className="text-white">February 11, 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Plans Section */}
          <div className="bg-gray-800 rounded-lg p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Plans & Pricing
            </h3>

            <div className="grid md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`border rounded-lg p-6 ${
                    plan.current
                      ? "border-red-600 bg-gray-700"
                      : "border-gray-600 bg-gray-800"
                  }`}
                >
                  {plan.current && (
                    <span className="inline-block bg-red-600 text-white text-xs px-3 py-1 rounded-full mb-3">
                      Current Plan
                    </span>
                  )}
                  <h4 className="text-xl font-bold text-white mb-2">
                    {plan.name}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">{plan.quality}</p>
                  <div className="mb-4">
                    <p className="text-3xl font-bold text-white">
                      {plan.price}
                      <span className="text-base font-normal text-gray-400">
                        /month
                      </span>
                    </p>
                  </div>
                  <p className="text-gray-400 text-sm mb-6">
                    Resolution: {plan.resolution}
                  </p>
                  <button
                    className={`w-full py-2 rounded font-semibold transition ${
                      plan.current
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-red-600 text-white hover:bg-red-700"
                    }`}
                    disabled={plan.current}
                  >
                    {plan.current ? "Active" : "Subscribe"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Settings Section */}
          <div className="bg-gray-800 rounded-lg p-6 md:p-8 mt-6">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Settings
            </h3>
            <div className="space-y-4">
              <button className="w-full text-left text-gray-300 hover:text-white transition py-3 border-b border-gray-700">
                Change email
              </button>
              <button className="w-full text-left text-gray-300 hover:text-white transition py-3 border-b border-gray-700">
                Change password
              </button>
              <button className="w-full text-left text-gray-300 hover:text-white transition py-3 border-b border-gray-700">
                Manage profiles
              </button>
              <button className="w-full text-left text-gray-300 hover:text-white transition py-3 border-b border-gray-700">
                Parental controls
              </button>
              <button className="w-full text-left text-red-500 hover:text-red-400 transition py-3">
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;