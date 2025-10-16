import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import coffeeBg from "../assets/Coffee 1.jpg";

interface FormData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

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
    <div 
      className="min-h-screen flex items-center justify-center login-bg relative overflow-hidden"
    >
      <div className="relative login-container p-8 rounded-3xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-500 hover:scale-105">
        {/* Coffee steam animation */}
        <div className="coffee-steam bg-amber-300/50" />
        
        <h2 className="text-4xl font-bold text-amber-800 text-center mb-4 animate-fade-in">
          ☕ Welcome Back!
        </h2>
        <p className="text-center text-amber-700 mb-8 font-medium animate-fade-in delay-100">
          Sip into your account
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
              {...register("username", { required: "Username is required" })}
              placeholder="Username"
              className="w-full border-2 border-amber-200 p-4 rounded-xl focus:ring-4 focus:ring-amber-300 focus:border-amber-400 focus:outline-none transition-all duration-300 bg-amber-50/50 placeholder-amber-500"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>
          <div>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              className="w-full border-2 border-amber-200 p-4 rounded-xl focus:ring-4 focus:ring-amber-300 focus:border-amber-400 focus:outline-none transition-all duration-300 bg-amber-50/50 placeholder-amber-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="btn-coffee w-full"
          >
            Brew Login ☕
          </button>
        </form>
        
        <div className="text-center mt-6 text-amber-600">
          New to the brew?{" "}
          <span
            className="font-bold hover:underline cursor-pointer transition-colors duration-200"
            onClick={() => navigate("/signup")}
          >
            Grind a New Account
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;