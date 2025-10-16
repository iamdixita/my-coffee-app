// src/components/ProductGrid.tsx (Improved from ProductTable)
import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";

interface Product { 
  id: number; 
  title: string; 
  price: number; 
  description: string; 
  category: string; 
  image: string; 
}
interface Props { 
  products: Product[]; 
  onDelete: (id: number) => void; 
  onUpdate: (product: Product) => void;
}

const ProductTable = ({ products, onDelete, onUpdate }: Props) => {
  const [selected, setSelected] = useState<Product | null>(null);

  if (!products.length) {
    return (
      <div className="text-center py-12">
        <p className="text-amber-600 text-lg">No products brewing yet... ☕</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 login-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-amber-800 mb-2">{product.title}</h3>
              <p className="text-amber-600 mb-2">${product.price.toFixed(2)} - {product.category}</p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
              <div className="flex gap-2">
                <button 
                  className="flex-1 bg-blue-500 text-white py-2 rounded-xl font-semibold transition-all duration-300 hover:bg-blue-600"
                  onClick={() => setSelected(product)}
                >
                  View
                </button>
                <button 
                  className="flex-1 bg-yellow-500 text-white py-2 rounded-xl font-semibold transition-all duration-300 hover:bg-yellow-600"
                  onClick={() => onUpdate(product)}
                >
                  Update
                </button>
                <button 
                  className="flex-1 bg-red-500 text-white py-2 rounded-xl font-semibold transition-all duration-300 hover:bg-red-600"
                  onClick={() => onDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {selected && <Modal product={selected} onClose={() => setSelected(null)} />}
    </>
  );
};

export default ProductTable;