// src/components/Modal.tsx
import { motion } from "framer-motion";
import { X, ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";
import type { Product } from "../api/productApi";

interface Props {
  product: Product;
  onClose: () => void;
}

const Modal = ({ product, onClose }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} of ${product.title} to cart`);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
  className="bg-white mt-15 p-2 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl border border-gray-100"
        initial={{ scale: 0.85, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all z-10 shadow-md"
        >
          <X size={24} className="text-gray-600" />
        </motion.button>

<div className="flex flex-col gap-8 p-6">
          {/* Left Section - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-80 object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 relative z-10"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/300x400?text=Product";
                }}
              />
            </div>

            {/* Favorite Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFavorite(!isFavorite)}
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 text-red-600 rounded-xl font-semibold transition-all border border-red-200"
            >
              <Heart
                size={20}
                className={isFavorite ? "fill-red-600" : ""}
              />
              {isFavorite ? "Added to Wishlist" : "Add to Wishlist"}
            </motion.button>
          </motion.div>

          {/* Right Section - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col justify-between"
          >
            {/* Category Badge */}
            <div>
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-bold rounded-full border border-blue-200 mb-4"
              >
                {product.category}
              </motion.span>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                {product.title}
              </h2>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < Math.round(product.rating!.rate)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm font-medium">
                    {product.rating.rate} · {product.rating.count} reviews
                  </span>
                </div>
              )}
            </div>

            {/* Price Section */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <p className="text-gray-600 text-sm font-medium mb-1">Price</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <p className="text-sm font-bold text-gray-900 mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 transition-all"
                >
                  −
                </button>
                <span className="text-xl font-bold text-gray-900 w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <ShoppingCart size={22} />
              Add to Cart
            </motion.button>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 font-medium">Free</p>
                <p className="text-sm font-bold text-gray-900">Shipping</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 font-medium">Easy</p>
                <p className="text-sm font-bold text-gray-900">Returns</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;