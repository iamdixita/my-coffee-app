import { useState, useEffect } from "react";
import { Coffee, Award, Users, Heart, ChevronLeft, ChevronRight } from "lucide-react";

const coffeeImages = [
  "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&h=1080&fit=crop",
];

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % coffeeImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="animate-"]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % coffeeImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + coffeeImages.length) % coffeeImages.length);
  };

  return (
    <div className="!min-h-screen !bg-gradient-to-b !from-amber-50 !to-stone-100">
      {/* Full-Screen Hero Section with Carousel */}
      <section className="!relative !h-screen !w-full !overflow-hidden">
        {/* Carousel Images */}
        <div className="!absolute !inset-0">
          {coffeeImages.map((img, idx) => (
            <div
              key={idx}
              className={`!absolute !inset-0 !transition-opacity !duration-1000 ${
                idx === currentSlide ? "!opacity-100" : "!opacity-0"
              }`}
            >
              <img
                src={img}
                alt={`Coffee ${idx + 1}`}
                className="!w-full !h-full !object-cover"
              />
              <div className="!absolute !inset-0 !bg-gradient-to-b !from-black/60 !via-black/40 !to-black/70" />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="!absolute !left-6 !top-1/2 !-translate-y-1/2 !z-20 !bg-white/20 !backdrop-blur-sm !px-3 !rounded-full !hover:bg-white/30 !transition-all !duration-300 !hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="!w-6 !h-6 !text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="!absolute !right-6 !top-1/2 !-translate-y-1/2 !z-20 !bg-white/20 !backdrop-blur-sm !px-3 !rounded-full !hover:bg-white/30 !transition-all !duration-300 !hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="!w-6 !h-6 !text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="!absolute !bottom-8 !left-1/2 !-translate-x-1/2 !z-20 !flex !gap-3">
          {coffeeImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`!h-2 !rounded-full !transition-all !duration-300 ${
                idx === currentSlide ? "!w-8 !bg-white" : "!w-2 !bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="!absolute !inset-0 !z-10 !flex !flex-col !items-center !justify-center !text-center !px-6">
          <div
            className="!animate-[fadeInUp_1s_ease-out]"
          >
            <h1 className="!text-6xl md:!text-8xl !font-bold !mb-6 !text-white !tracking-tight !drop-shadow-2xl">
              CoffeeShop
            </h1>
            <p className="!text-xl md:!text-2xl !text-gray-200 !mb-10 !max-w-3xl !mx-auto !leading-relaxed !font-light !drop-shadow-lg">
              Experience the perfect blend of flavor and aroma. Handcrafted with passion, served with love.
            </p>
            <div className="!flex !flex-col sm:!flex-row !gap-5 !justify-center">
              <button
                className="!bg-white/10 !backdrop-blur-md !text-white !border !border-white !px-10 !py-4 !rounded-full !font-semibold !transition-all !duration-300 !hover:bg-white !hover:text-amber-900 !hover:scale-105 !transform"
              >
                Sip In ☕
              </button>
              <button
                className="!bg-white !text-amber-900 !px-10 !py-4 !rounded-full !font-semibold !shadow-xl !transition-all !duration-300 !hover:bg-amber-900 !hover:text-white !hover:scale-105 !transform"
              >
                Grind New
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="!absolute !bottom-24 !left-1/2 !-translate-x-1/2 !z-20 !animate-bounce">
          <div className="!w-6 !h-10 !border-2 !border-white !rounded-full !flex !justify-center">
            <div className="!w-1 !h-3 !bg-white !rounded-full !mt-2 !animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="!py-20 !px-6 !bg-gradient-to-b !from-amber-50 !to-stone-50">
        <div className="!max-w-7xl !mx-auto">
          <div className="!text-center !mb-16">
            <h2 className="!text-4xl md:!text-5xl !font-bold !text-amber-900 !mb-4">Why Choose Us</h2>
            <p className="!text-gray-600 !text-lg">Discover what makes our coffee exceptional</p>
          </div>
          <div className="!grid !grid-cols-1 md:!grid-cols-4 !gap-8">
            {[
              { icon: Coffee, title: "Premium Beans", desc: "Sourced from the finest coffee regions worldwide" },
              { icon: Award, title: "Award Winning", desc: "Recognized for excellence in coffee craftsmanship" },
              { icon: Users, title: "Expert Baristas", desc: "Trained professionals passionate about coffee" },
              { icon: Heart, title: "Made with Love", desc: "Every cup is crafted with care and dedication" },
            ].map((feature, idx) => (
              <div
                key={idx}
                id={`animate-feature-${idx}`}
                className={`!text-center !p-8 !bg-white !rounded-2xl !shadow-lg !hover:shadow-2xl !transition-all !duration-500 !transform !hover:-translate-y-2 ${
                  isVisible[`animate-feature-${idx}`]
                    ? "!opacity-100 !translate-y-0"
                    : "!opacity-0 !translate-y-10"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="!bg-amber-100 !w-16 !h-16 !rounded-full !flex !items-center !justify-center !mx-auto !mb-4">
                  <feature.icon className="!w-8 !h-8 !text-amber-900" />
                </div>
                <h3 className="!text-xl !font-bold !mb-3 !text-amber-900">{feature.title}</h3>
                <p className="!text-gray-600 !leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="animate-about" className="!py-24 !px-6 !bg-gradient-to-br !from-amber-900 !to-amber-800 !text-white !relative !overflow-hidden">
        <div className="!absolute !inset-0 !opacity-10">
          <div className="!absolute !top-20 !left-20 !w-64 !h-64 !bg-white !rounded-full !blur-3xl" />
          <div className="!absolute !bottom-20 !right-20 !w-96 !h-96 !bg-white !rounded-full !blur-3xl" />
        </div>
        <div
          className={`!max-w-6xl !mx-auto !relative !z-10 !transition-all !duration-1000 ${
            isVisible["animate-about"] ? "!opacity-100 !translate-y-0" : "!opacity-0 !translate-y-10"
          }`}
        >
          <div className="!text-center !mb-16">
            <h2 className="!text-5xl md:!text-6xl !font-bold !mb-6">About Our Journey</h2>
            <div className="!w-24 !h-1 !bg-white !mx-auto !rounded-full" />
          </div>
          <div className="!grid md:!grid-cols-2 !gap-12 !items-center">
            <div className="!space-y-6">
              <p className="!text-lg !leading-relaxed !text-amber-50">
                Founded in the heart of coffee culture, CoffeeShop began as a dream to bring exceptional coffee experiences to every customer. Our journey started with a simple belief: great coffee can transform moments into memories.
              </p>
              <p className="!text-lg !leading-relaxed !text-amber-50">
                We travel the world to source the finest beans, building relationships with farmers who share our commitment to quality and sustainability. Every cup tells a story of dedication, passion, and the pursuit of perfection.
              </p>
              <p className="!text-lg !leading-relaxed !text-amber-50">
                Today, we're proud to serve a community of coffee lovers who appreciate the art and science behind every brew. Join us in celebrating the simple pleasure of an extraordinary cup of coffee.
              </p>
            </div>
            <div className="!grid !grid-cols-2 !gap-6">
              <div className="!bg-white/10 !backdrop-blur-sm !p-8 !rounded-2xl !text-center !transform !hover:scale-105 !transition-transform !duration-300">
                <div className="!text-5xl !font-bold !mb-2">10+</div>
                <div className="!text-amber-100">Years Experience</div>
              </div>
              <div className="!bg-white/10 !backdrop-blur-sm !p-8 !rounded-2xl !text-center !transform !hover:scale-105 !transition-transform !duration-300">
                <div className="!text-5xl !font-bold !mb-2">50K+</div>
                <div className="!text-amber-100">Happy Customers</div>
              </div>
              <div className="!bg-white/10 !backdrop-blur-sm !p-8 !rounded-2xl !text-center !transform !hover:scale-105 !transition-transform !duration-300">
                <div className="!text-5xl !font-bold !mb-2">25+</div>
                <div className="!text-amber-100">Coffee Varieties</div>
              </div>
              <div className="!bg-white/10 !backdrop-blur-sm !p-8 !rounded-2xl !text-center !transform !hover:scale-105 !transition-transform !duration-300">
                <div className="!text-5xl !font-bold !mb-2">15+</div>
                <div className="!text-amber-100">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="!py-20 !px-6 !bg-gradient-to-b !from-stone-50 !to-amber-50">
        <div
          id="animate-cta"
          className={`!max-w-4xl !mx-auto !text-center !transition-all !duration-1000 ${
            isVisible["animate-cta"] ? "!opacity-100 !scale-100" : "!opacity-0 !scale-95"
          }`}
        >
          <h2 className="!text-4xl md:!text-5xl !font-bold !mb-6 !text-amber-900">
            Ready to Start Your Coffee Journey?
          </h2>
          <p className="!text-xl !text-gray-600 !mb-10 !leading-relaxed">
            Join thousands of coffee enthusiasts and discover your perfect brew today.
          </p>
          <button
            className="!inline-block !bg-amber-900 !text-white !px-12 !py-5 !rounded-full !font-bold !text-lg !shadow-xl !transition-all !duration-300 !hover:bg-amber-800 !hover:scale-105 !transform"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="!bg-stone-900 !text-gray-300 !py-16 !px-6">
        <div className="!max-w-7xl !mx-auto">
          <div className="!grid !grid-cols-1 md:!grid-cols-4 !gap-12 !mb-12">
            <div>
              <h3 className="!text-2xl !font-bold !text-white !mb-4 !flex !items-center !gap-2">
                ☕ CoffeeShop
              </h3>
              <p className="!text-gray-400 !leading-relaxed !mb-4">
                Brewing excellence since 2014. Your destination for premium coffee experiences.
              </p>
              <div className="!flex !gap-3 !mt-4">
                <a href="#" className="!w-10 !h-10 !bg-amber-900 !rounded-full !flex !items-center !justify-center !hover:bg-amber-800 !transition-colors !text-white !font-semibold">
                  f
                </a>
                <a href="#" className="!w-10 !h-10 !bg-amber-900 !rounded-full !flex !items-center !justify-center !hover:bg-amber-800 !transition-colors">
                  📷
                </a>
                <a href="#" className="!w-10 !h-10 !bg-amber-900 !rounded-full !flex !items-center !justify-center !hover:bg-amber-800 !transition-colors">
                  🐦
                </a>
              </div>
            </div>
            <div>
              <h4 className="!text-lg !font-semibold !text-white !mb-4">Quick Links</h4>
              <ul className="!space-y-2">
                <li><a href="#menu" className="!hover:text-white !transition-colors !hover:underline">Our Menu</a></li>
                <li><a href="#locations" className="!hover:text-white !transition-colors !hover:underline">Locations</a></li>
                <li><a href="#catering" className="!hover:text-white !transition-colors !hover:underline">Catering</a></li>
                <li><a href="#careers" className="!hover:text-white !transition-colors !hover:underline">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="!text-lg !font-semibold !text-white !mb-4">Support</h4>
              <ul className="!space-y-2">
                <li><a href="#faq" className="!hover:text-white !transition-colors !hover:underline">FAQ</a></li>
                <li><a href="#contact" className="!hover:text-white !transition-colors !hover:underline">Contact Us</a></li>
                <li><a href="#shipping" className="!hover:text-white !transition-colors !hover:underline">Shipping Info</a></li>
                <li><a href="#returns" className="!hover:text-white !transition-colors !hover:underline">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="!text-lg !font-semibold !text-white !mb-4">Newsletter</h4>
              <p className="!text-sm !text-gray-400 !mb-4">Subscribe for exclusive offers and updates!</p>
              <div className="!flex !gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="!flex-1 !px-4 !py-2 !rounded-full !bg-stone-800 !border !border-stone-700 !focus:outline-none !focus:border-amber-900 !text-white !placeholder-gray-500"
                />
                <button className="!bg-amber-900 !text-white !px-6 !py-2 !rounded-full !font-semibold !hover:bg-amber-800 !transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="!border-t !border-stone-800 !pt-8 !text-center !text-sm !text-gray-400">
            <p>&copy; 2025 CoffeeShop. All rights reserved. | <a href="#privacy" className="!hover:text-white !transition-colors">Privacy Policy</a> | <a href="#terms" className="!hover:text-white !transition-colors">Terms of Service</a></p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;