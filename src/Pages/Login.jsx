import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Krupaya email ani password enter kara!");
      return;
    }

    if (isSignUp) {
      // 1. Sign Up यशस्वी झाल्यावर माहिती सेव्ह करा
      localStorage.setItem("user", JSON.stringify({ email, name }));
      alert("Account create zhaley! Krupaya atah Login kara.");
      
      // 2. फॉर्म पुन्हा Sign In मोडवर आणा आणि पासवर्ड फील्ड रिकामे करा
      setIsSignUp(false);
      setPassword("");
    } else {
      // Sign In केल्यावर थेट होमपेजवर जा
      localStorage.setItem("user", JSON.stringify({ email, name }));
      navigate("/");
    }
  };

  return (
    <div className="relative h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center bg-black">
      {/* Netflix Logo Top */}
      <img
        className="absolute top-6 left-10 w-28 md:w-40 cursor-pointer"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix"
        onClick={() => navigate("/")}
      />

      {/* Auth Card */}
      <div className="z-10 bg-black/75 p-12 md:p-16 rounded-md w-full max-w-[450px] text-white border border-gray-800">
        <h2 className="text-3xl font-bold mb-7">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3.5 rounded bg-[#333] text-white outline-none focus:bg-[#454545] border-none"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3.5 rounded bg-[#333] text-white outline-none focus:bg-[#454545] border-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3.5 rounded bg-[#333] text-white outline-none focus:bg-[#454545] border-none"
            required
          />

          <button
            type="submit"
            className="bg-[#e50914] hover:bg-[#b80710] py-3.5 rounded font-semibold mt-4 transition duration-200"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>

          <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
            <label className="flex items-center space-x-1 cursor-pointer">
              <input type="checkbox" className="accent-gray-400" defaultChecked />
              <span>Remember me</span>
            </label>
            <span className="hover:underline cursor-pointer">Need help?</span>
          </div>
        </form>

        <div className="mt-12 text-sm text-gray-400">
          {isSignUp ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setIsSignUp(false)}
                className="text-white hover:underline cursor-pointer font-medium"
              >
                Sign in now.
              </span>
            </p>
          ) : (
            <p>
              New to Netflix?{" "}
              <span
                onClick={() => setIsSignUp(true)}
                className="text-white hover:underline cursor-pointer font-medium"
              >
                Sign up now.
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;