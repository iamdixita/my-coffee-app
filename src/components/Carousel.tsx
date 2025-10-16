// src/components/Carousel.tsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface CarouselProps {
  images: string[];
}

const Carousel = ({ images }: CarouselProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // 4 seconds interval
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-3xl shadow-2xl">
      {images.map((img, i) => (
        <motion.img
          key={i}
          src={img}
          alt={`coffee-${i}`}
          className="absolute w-full h-full object-cover rounded-3xl"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{
            opacity: i === current ? 1 : 0,
            scale: i === current ? 1 : 1.05,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      ))}

      {/* Indicator dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 
              ${
                i === current
                  ? "bg-[#7a7a7a] scale-125"
                  : "bg-[#d9d9d9] hover:bg-[#bfbfbf]"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
