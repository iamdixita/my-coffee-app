// ...existing code...
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaCoffee } from "react-icons/fa";
import coffee from "../../public/assets/coffee3.jpg";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const SignupPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: FormData) => {
    localStorage.setItem("signupUser", JSON.stringify(data));
    login({ username: data.username, email: data.email });
    navigate("/products");
  };

  return (
        <div className="flex min-h-screen bg-gray-50">
      {/* Left Side - Signup Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 md:px-16 lg:px-24 bg-[#f9f5ec]">
<div className="w-full max-w-xl bg-white p-10 rounded-3xl shadow-lg border border-amber-100 transition-all duration-500 hover:shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <FaCoffee className="text-amber-800 mr-2" size={28} />
            <h1 className="text-3xl font-extrabold text-amber-800 text-center">
              Create Account
            </h1>
          </div>

          <p className="text-center text-amber-700 mb-8 font-medium">
            Join the brew and discover exquisite coffees
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-amber-700 font-medium mb-1">Username</label>
              <input
                {...register("username")}
                placeholder="Enter your username"
                className="w-full border border-amber-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all bg-amber-50/40 placeholder-amber-500"
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
            </div>

            <div>
              <label className="block text-amber-700 font-medium mb-1">Email</label>
              <input
                {...register("email")}
                placeholder="Enter your email"
                className="w-full border border-amber-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all bg-amber-50/40 placeholder-amber-500"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-amber-700 font-medium mb-1">Password</label>
              <input
                type="password"
                {...register("password")}
                placeholder="Enter your password"
                className="w-full border border-amber-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all bg-amber-50/40 placeholder-amber-500"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-amber-700 font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm your password"
                className="w-full border border-amber-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all bg-amber-50/40 placeholder-amber-500"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 rounded-xl shadow-md transition-all flex items-center justify-center"
            >
              Create Account
              <FaCoffee className="ml-3" size={18} />
            </button>
          </form>

          <p className="text-center text-amber-700 mt-6">
            Already brewing?{" "}
            <span
              className="font-semibold text-amber-800 hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block w-1/2 -mt-30">
        <img src={coffee} alt="Coffee background" className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default SignupPage;
