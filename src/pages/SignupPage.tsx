// src/pages/SignupPage.tsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import coffeeBg from "../assets/Coffee 1.jpg";

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
    <div 
      className="min-h-screen flex items-center justify-center login-bg relative overflow-hidden"
    >
      <div className="relative login-container p-8 rounded-3xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-500 hover:scale-105">
        {/* Coffee steam animation */}
        <div className="coffee-steam bg-amber-300/50" />
        
        <h2 className="text-4xl font-bold text-amber-800 text-center mb-4 animate-fade-in">
          ☕ Join the Brew!
        </h2>
        <p className="text-center text-amber-700 mb-8 font-medium animate-fade-in delay-100">
          Create your account and discover exquisite coffees
        </p>
        
        {/* Decorative coffee beans */}
        <div className="flex justify-between mb-6">
          <span className="coffee-bean" />
          <span className="coffee-bean animate-bounce-soft [animation-delay:0.1s]" />
          <span className="coffee-bean animate-bounce-soft [animation-delay:0.2s]" />
        </div>
        
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-5"
        >
          <div>
            <input
              {...register("username")}
              placeholder="Username"
              className="w-full border-2 border-amber-200 p-4 rounded-xl focus:ring-4 focus:ring-amber-300 focus:border-amber-400 focus:outline-none transition-all duration-300 bg-amber-50/50 placeholder-amber-500"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>
          <div>
            <input
              {...register("email")}
              placeholder="Email"
              className="w-full border-2 border-amber-200 p-4 rounded-xl focus:ring-4 focus:ring-amber-300 focus:border-amber-400 focus:outline-none transition-all duration-300 bg-amber-50/50 placeholder-amber-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full border-2 border-amber-200 p-4 rounded-xl focus:ring-4 focus:ring-amber-300 focus:border-amber-400 focus:outline-none transition-all duration-300 bg-amber-50/50 placeholder-amber-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm Password"
              className="w-full border-2 border-amber-200 p-4 rounded-xl focus:ring-4 focus:ring-amber-300 focus:border-amber-400 focus:outline-none transition-all duration-300 bg-amber-50/50 placeholder-amber-500"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>
          <button
            type="submit"
            className="btn-coffee w-full"
          >
            Grind Account ☕
          </button>
        </form>
        
        <div className="text-center mt-6 text-amber-600">
          Already brewing?{" "}
          <span
            className="font-bold hover:underline cursor-pointer transition-colors duration-200"
            onClick={() => navigate("/login")}
          >
            Sip In
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;