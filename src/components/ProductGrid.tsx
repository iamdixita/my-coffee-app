// src/components/ProductGrid.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import Modal from "./Modal";
import type { Product } from "../api/productApi";

interface Props {
  products: Product[];
  onDelete: (id: number) => void;
  onUpdate: (product: Product) => void;
}

const ProductGrid = ({ products, onDelete, onUpdate }: Props) => {
  const [selected, setSelected] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  if (!products.length) {
    return (
      <motion.div
        className="!text-center !py-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="!w-24 !h-24 !mx-auto !mb-4 !bg-gray-100 !rounded-full !flex !items-center !justify-center">
          <Heart className="!w-12 !h-12 !text-gray-500" />
        </div>
        <p className="!text-gray-600 !text-lg !font-semibold">
          No products brewing yet... ☕
        </p>
        <p className="!text-gray-400 !text-sm !mt-2">
          Start by adding your first coffee blend!
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <div className="!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 !gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="!bg-white !rounded-2xl !shadow-lg !overflow-hidden !hover:shadow-xl !transition-all !duration-300 !transform !hover:scale-105 !border !border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="!relative !group">
              <img
                src={product.image}
                alt={product.title}
                className="!w-full !h-48 !object-cover !group-hover:brightness-90 !transition-all !duration-300"
                onError={(e) => {
                  e.currentTarget.src = "/assets/coffee1.jpg"; // Fallback image
                }}
              />
              <button
                onClick={() => toggleFavorite(product.id)}
                className="!absolute !top-3 !right-3 !p-2 !bg-white/90 !rounded-full !shadow-md !transition-all !duration-300 !hover:bg-gray-100 !opacity-0 !group-hover:opacity-100"
              >
                <Heart
                  className={`!w-5 !h-5 ${
                    favorites.has(product.id)
                      ? "!fill-red-500 !text-red-500"
                      : "!text-gray-500"
                  }`}
                />
              </button>
              <div className="!absolute !bottom-2 !left-2 !right-2 !bg-gradient-to-t !from-black/60 !to-transparent !p-3">
                <p className="!text-white !text-sm !font-medium !truncate">
                  {product.category}
                </p>
              </div>
              {product.rating && (
                <div className="!absolute !top-3 !left-3 !bg-white/90 !px-2 !py-1 !rounded-full !text-xs !font-semibold !text-gray-700">
                  ⭐ {product.rating.rate} ({product.rating.count})
                </div>
              )}
            </div>
            <div className="!p-6">
              <h3 className="!text-xl !font-bold !text-gray-800 !mb-2 !truncate">
                {product.title}
              </h3>
              <p className="!text-2xl !font-bold !text-gray-600 !mb-3">
                ${product.price.toFixed(2)}
              </p>
              <p className="!text-gray-600 !text-sm !mb-6 !line-clamp-3 !leading-relaxed">
                {product.description}
              </p>
              <div className="!flex !gap-3">
                <button
                  className="!flex-1 !bg-indigo-500 !text-white !py-3 !rounded-xl !font-semibold !transition-all !duration-300 !hover:bg-indigo-600 !hover:shadow-md !flex !items-center !justify-center !gap-2"
                  onClick={() => setSelected(product)}
                >
                  <ShoppingCart size={18} />
                  View Details
                </button>
                <button
                  className="!px-4 !bg-slate-500 !text-white !py-3 !rounded-xl !font-semibold !transition-all !duration-300 !hover:bg-slate-600 !hover:shadow-md"
                  onClick={() => onUpdate(product)}
                >
                  Edit
                </button>
                <button
                  className="!px-4 !bg-red-500 !text-white !py-3 !rounded-xl !font-semibold !transition-all !duration-300 !hover:bg-red-600 !hover:shadow-md"
                  onClick={() => onDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {selected && (
        <Modal product={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
};

export default ProductGrid;
