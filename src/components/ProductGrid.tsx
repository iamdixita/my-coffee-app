// src/components/ProductGrid.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2, Edit2 } from "lucide-react";
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
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
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
        className="text-center py-20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <ShoppingCart className="w-12 h-12 text-blue-400" />
        </div>
        <p className="text-gray-700 text-lg font-semibold">
          No products available
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Start adding products to see them here
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-400 overflow-hidden border border-gray-100 h-full flex flex-col hover:border-blue-200">
              {/* Image Container */}
              <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/300x300?text=Product";
                  }}
                />

                {/* Favorite Button */}
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: hoveredId === product.id ? 1 : 0.8,
                    opacity: hoveredId === product.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => toggleFavorite(product.id, e)}
                  className="absolute top-4 right-4 p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      favorites.has(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400 hover:text-red-500"
                    }`}
                  />
                </motion.button>

                {/* Rating Badge */}
                {product.rating && (
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-md">
                    <span className="mr-1">⭐</span>
                    {product.rating.rate}
                    <span className="text-gray-500 ml-1">
                      ({product.rating.count})
                    </span>
                  </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-transparent group-hover:from-black/20 transition-all duration-300" />
              </div>

              {/* Content Container */}
              <div className="p-5 flex-1 flex flex-col">
                {/* Category Badge */}
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
                    {product.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2 leading-snug">
                  {product.title}
                </h3>

                {/* Price */}
                <div className="mb-3">
                  <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow">
                  {product.description}
                </p>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="!w-full !bg-blue-50 !hover:bg-blue-100 !text-blue-600
                     !font-semibold !py-2.5 
                     !rounded-lg !font-semibold !transition-all !duration-300
                      flex items-center justify-center gap-2 shadow-md hover:shadow-lg"



                    onClick={() => setSelected(product)}
                  >
                    <ShoppingCart size={18} />
                    View Details
                  </motion.button>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="!flex-1 !bg-gray-100 !hover:bg-gray-200 !text-gray-700 !font-semibold !py-2.5 !rounded-lg !transition-all !duration-300 !flex !items-center !justify-center !gap-2"
                      onClick={() => onUpdate(product)}
                    >
                      <Edit2 size={16} />
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    className="!flex-1 !bg-red-50 !hover:bg-red-100 !text-red-600 !font-semibold !py-2.5 !rounded-lg !transition-all !duration-300 !flex !items-center !justify-center !gap-2"
                      onClick={() => onDelete(product.id)}
                    >
                      <Trash2 size={16} />
                      Delete
                    </motion.button>
                  </div>
                </div>
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