import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  const [inputData, setInputData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confpassword: "",
    gender: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { id, value } = e.target;
    setInputData((prev) => ({ ...prev, [id]: value }));

    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const selectGender = (gender) => {
    setInputData((prev) => ({ ...prev, gender: gender === inputData.gender ? "" : gender }));
    if (errors.gender) {
      setErrors((prev) => ({ ...prev, gender: "" }));
    }
  };

  const selectRole = (role) => {
    setInputData((prev) => ({ ...prev, role }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!inputData.fullname.trim()) newErrors.fullname = "Full name is required";
    if (!inputData.username.trim()) newErrors.username = "Username is required";
    if (!inputData.email.trim()) newErrors.email = "Email is required";
    if (!inputData.password) newErrors.password = "Password is required";
    if (!inputData.confpassword) newErrors.confpassword = "Confirm password is required";
    if (!inputData.gender) newErrors.gender = "Please select gender";
    if (!inputData.role) newErrors.role = "Please select a role";

    if (inputData.password !== inputData.confpassword) {
      newErrors.confpassword = "Passwords do not match";
    }

    if (inputData.password && inputData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, inputData);
      const data = res.data;

      if (data.success === false) {
        toast.error(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      toast.success(data.message || "Registered successfully");
      localStorage.setItem("chatapp", JSON.stringify(data));
      setAuthUser(data);
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center max-w-md w-full mx-auto">
        <div className="w-full p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20">
          <h1 className="text-4xl font-bold text-center text-white mb-8">
            Register <span className="text-purple-300">Chatters</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {["fullname", "username", "email", "password", "confpassword"].map((field) => (
              <div key={field}>
                <label className="block text-white font-semibold mb-2 capitalize">{field.replace("conf", "confirm ")}</label>
                <input
                  id={field}
                  type={field.includes("password") ? "password" : "text"}
                  value={inputData[field]}
                  onChange={handleInput}
                  placeholder={`Enter your ${field.replace("conf", "confirm ")}`}
                  className={`w-full px-4 py-3 rounded-lg bg-white/20 border ${
                    errors[field] ? "border-red-400" : "border-white/30"
                  } text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all`}
                />
                {errors[field] && <p className="text-red-400 text-sm mt-1">{errors[field]}</p>}
              </div>
            ))}

            {/* Gender */}
            <div>
              <label className="block text-white font-semibold mb-3">Gender</label>
              <div className="flex gap-6">
                {["male", "female"].map((g) => (
                  <label key={g} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inputData.gender === g}
                      onChange={() => selectGender(g)}
                      className="w-5 h-5 text-purple-400 bg-white/20 border-white/30 rounded focus:ring-purple-400 focus:ring-2"
                    />
                    <span className="ml-2 text-white font-medium capitalize">{g}</span>
                  </label>
                ))}
              </div>
              {errors.gender && <p className="text-red-400 text-sm mt-1">{errors.gender}</p>}
            </div>

            {/* Role */}
            <div>
              <label className="block text-white font-semibold mb-3">Register As</label>
              <div className="flex gap-6">
                {["user", "agent"].map((r) => (
                  <label key={r} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      checked={inputData.role === r}
                      onChange={() => selectRole(r)}
                      className="w-5 h-5 text-purple-400 bg-white/20 border-white/30 focus:ring-purple-400"
                    />
                    <span className="ml-2 text-white font-medium capitalize">{r}</span>
                  </label>
                ))}
              </div>
              {errors.role && <p className="text-red-400 text-sm mt-1">{errors.role}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Registering...
                </div>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-300 font-semibold hover:text-purple-200 underline transition-colors">
                Login Now!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
