import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaCoffee } from "react-icons/fa";
import coffee from "../../public/assets/coffee3.jpg";

interface FormData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const storedUser = localStorage.getItem("signupUser");
    if (!storedUser) return alert("No user found. Please signup.");
    const user = JSON.parse(storedUser);
    if (user.username === data.username && user.password === data.password) {
      login({ username: user.username, email: user.email });
      navigate("/products");
    } else alert("Invalid credentials");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 md:px-16 lg:px-24 bg-[#f9f5ec]">
        <div className="w-full max-w-lg bg-white p-10 rounded-3xl shadow-lg border border-amber-100 transition-all duration-500 hover:shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <FaCoffee className="text-amber-800 mr-2" size={28} />
            <h1 className="text-3xl font-extrabold text-amber-800 text-center">
              Welcome Back
            </h1>
          </div>

          <p className="text-center text-amber-700 mb-8 font-medium">
            Log in to continue your coffee journey
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-amber-700 font-medium mb-1">
                Username
              </label>
              <input
                {...register("username", { required: "Username is required" })}
                placeholder="Enter your username"
                className="w-full border border-amber-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all bg-amber-50/40 placeholder-amber-500"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-amber-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                placeholder="Enter your password"
                className="w-full border border-amber-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all bg-amber-50/40 placeholder-amber-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-amber-700">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 accent-amber-700" />
                Remember me
              </label>
              <button
                type="button"
                className="hover:underline font-medium"
                onClick={() => alert("Password recovery feature coming soon!")}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 rounded-xl shadow-md transition-all flex items-center justify-center"
            >
              Brew Login
              <FaCoffee className="ml-3" size={18} />
            </button>
          </form>

          <p className="text-center text-amber-700 mt-6">
            New to the brew?{" "}
            <span
              className="font-semibold text-amber-800 hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Create an account
            </span>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block w-1/2 -mt-30">
        <img
          src={coffee}
          alt="Coffee background"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
