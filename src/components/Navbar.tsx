// src/components/Navbar.tsx
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "../../public/assets/Logo.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-[#f9f9f9] via-[#f2f2f2] to-[#e9e9e9] shadow-lg sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-2 py-2 flex justify-between items-center">
        {/* Logo + Brand */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link to="/" className="flex items-center gap-4">
            <div className="bg-[#f0eaea] p-1 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                       src={Logo}
                alt="CoffeeShop Logo"
                className="w-18 h-10 object-contain rounded-full"
                onError={(e) => {
                 // fallback to public path if import fails
                 (e.currentTarget as HTMLImageElement).src = "/assets/Logo.png";
                }}
              />
            </div>
            <span
              className="!text-2xl font-extrabold tracking-wide bg-clip-text text-transparent 
  !bg-gradient-to-r !from-[#7a5a53] !via-[#a9887f] !to-[#c9a79b] drop-shadow-md animate-text-pulse"
            >
              CoffeeShop
            </span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
       <div className="hidden md:flex items-center justify-between w-full px-8">
  {/* Left side — Centered navigation links */}
  <div className="flex-1 flex justify-center gap-6">
    <Link
      to="/"
      className="!bg-transparent !text-[#5a2e2e] px-3 py-2 rounded-xl font-semibold transition-all duration-300 hover:!bg-gray-100"
    >
      Home
    </Link>

    <Link
      to="/about"
      className="!bg-transparent !text-[#5a2e2e] px-3 py-2 rounded-xl font-semibold transition-all duration-300 hover:!bg-gray-100"
    >
      About Us
    </Link>

    {user && (
      <Link
        to="/products"
        className="!bg-transparent !text-[#5a2e2e] px-3 py-2 rounded-xl font-semibold transition-all duration-300 hover:!bg-gray-100"
      >
        Products
      </Link>
    )}
  </div>

  {/* Right side — User info or auth buttons */}
  <div className="flex items-center gap-4">
    {user ? (
      <>
        <span className="text-[#8f5c5c] font-bold">Hello, {user.username}</span>
        <button
          onClick={handleLogout}
          className="!bg-[#e0d5d5] !text-[#562b2b] cursor-pointer px-3 py-2 rounded-xl font-semibold transition-all duration-300 hover:!bg-[#8c8c8c] hover:!text-white !shadow-sm"
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <Link
          to="/login"
          className="!px-3 !py-2 !rounded-2xl !font-medium !text-amber-900 hover:!bg-gray-200 !transition-all !duration-300"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="!px-4 !py-2 !rounded-2xl !font-medium !text-amber-900 hover:!bg-gray-200 !transition-all !duration-300"
        >
          Sign Up
        </Link>
      </>
    )}
  </div>
</div>


        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#5a2e2e]"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#fbe3e6]/95 backdrop-blur-md shadow-inner"
          >
            <div className="flex flex-col px-4 py-4 gap-3">
              {user ? (
                <>
                  <span className="text-[#5a2e2e] font-medium">
                    Hello, {user.username}
                  </span>
                  <Link
                    to="/products"
                    className="text-[#5a2e2e] px-4 py-2 rounded-xl font-semibold hover:bg-[#f3caca]/60 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Products
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-[#e88b8b] text-white px-4 py-2 rounded-xl font-semibold hover:bg-[#d97474] transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[#5a2e2e] px-4 py-2 rounded-xl font-semibold hover:bg-[#f3caca]/60 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-[#5a2e2e] text-white px-4 py-2 rounded-xl font-semibold shadow hover:bg-[#7a4040] transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
