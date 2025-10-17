import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCoffee } from "react-icons/fa";
import coffee from "../../public/assets/coffee11.jpg";

const AboutPage = () => {
  const navigate = useNavigate();

  // prevent page scrolling while AboutPage is open
 useEffect(() => {
   const prev = document.body.style.overflow;
   document.body.style.overflow = "hidden";
       return () => {
     document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${coffee})` }}
        aria-hidden="true"
      />
      {/* Gradient overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 -z-5" />

      <header className="min-h-screen flex items-center">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 max-w-3xl text-white border border-white/10 shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <FaCoffee className="text-amber-300" size={32} />
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                About CoffeeShop
              </h1>
            </div>

            <p className="text-amber-100/90 mb-6 text-lg md:text-xl">
              We craft memorable coffee experiences — from ethically-sourced beans
              to carefully roasted blends. Sip, savor, and join our journey.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/6 p-4 rounded-xl border border-white/6">
                <h3 className="text-amber-200 font-semibold mb-2">Our Story</h3>
                <p className="text-sm text-amber-100/85">
                  Started by coffee lovers, we focus on flavor, community and craft.
                </p>
              </div>

              <div className="bg-white/6 p-4 rounded-xl border border-white/6">
                <h3 className="text-amber-200 font-semibold mb-2">Roast & Flavor</h3>
                <p className="text-sm text-amber-100/85">
                  Small-batch roasts tuned to highlight origin notes — bright, nutty or chocolatey.
                </p>
              </div>

              <div className="bg-white/6 p-4 rounded-xl border border-white/6">
                <h3 className="text-amber-200 font-semibold mb-2">Sustainability</h3>
                <p className="text-sm text-amber-100/85">
                  We partner with farms focused on care for people and the planet.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 items-center">
              <button
                onClick={() => navigate("/products")}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold shadow-md transition"
              >
                Explore Products
              </button>

              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-amber-100 rounded-xl font-medium transition"
              >
                Back to Home
              </button>
            </div>
          </div>

          {/* Bottom small note */}
          <p className="mt-6 text-amber-100/70 text-sm max-w-2xl">
            Visit our products to try our latest seasonal blends and single origins.
          </p>
        </div>
      </header>
    </div>
  );
};

export default AboutPage;