// src/components/Modal.tsx
import { motion } from "framer-motion";
import type { Product } from "../api/productApi";

interface Props {
  product: Product;
  onClose: () => void;
}

const Modal = ({ product, onClose }: Props) => (
  <motion.div
    className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="bg-[#fefcf7] p-6 rounded-3xl w-full max-w-lg relative shadow-2xl border border-gray-200"
      initial={{ scale: 0.9, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 50 }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-semibold transition"
      >
        ×
      </button>

      {/* Product title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        {product.title}
      </h2>

      {/* Product image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-56 object-cover rounded-2xl mb-6 shadow-md transition-transform duration-300 hover:scale-105"
        onError={(e) => {
          e.currentTarget.src = "/assets/coffee1.jpg";
        }}
      />

      {/* Product details in structured layout */}
      <div className="space-y-4 text-gray-700">
        <div className="flex justify-between">
          <span className="font-semibold">Price:</span>
          <span>${product.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Category:</span>
          <span>{product.category}</span>
        </div>
        {product.rating && (
          <div className="flex justify-between">
            <span className="font-semibold">Rating:</span>
            <span>
              ⭐ {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>
        )}
        <div>
          <span className="font-semibold">Description:</span>
          <p className="mt-1 text-gray-600">{product.description}</p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default Modal;
