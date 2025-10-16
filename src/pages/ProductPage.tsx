// src/pages/ProductPage.tsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, deleteProduct, updateProduct } from "../api/productApi";
import type { Product } from "../api/productApi";
import { motion } from "framer-motion";
import { Search, Filter, Edit } from "lucide-react";
import ProductGrid from "../components/ProductGrid";

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      alert("Product deleted successfully!");
    },
    onError: (error) => {
      alert(`Error deleting product: ${error.message}`);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Product> }) =>
      updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsEditing(false);
      setEditingProduct(null);
      alert("Product updated successfully!");
    },
    onError: (error) => {
      alert(`Error updating product: ${error.message}`);
    },
  });

  const filteredProducts: Product[] = ((products as Product[]) || []).filter(
    (product: Product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }
  );

  const categories = [
    "All",
    ...new Set((products || []).map((p) => p.category)),
  ];

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleUpdate = (product: Product) => {
    setEditingProduct(product);
    setIsEditing(true);
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProduct) return;

    const formData = new FormData(e.currentTarget);
    const updatedData: Partial<Product> = {
      title: formData.get("title") as string,
      price: parseFloat(formData.get("price") as string),
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      image: formData.get("image") as string,
    };

    updateMutation.mutate({ id: editingProduct.id, data: updatedData });
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditingProduct(null);
  };

  if (isLoading) {
    return (
      <div className="!min-h-screen !flex !items-center !justify-center !bg-gradient-to-br !from-gray-50 !via-white !to-stone-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="!text-center"
        >
          <div className="!coffee-steam !w-16 !h-16 !mx-auto !mb-4 !animate-pulse" />
          <p className="!text-gray-800 !font-semibold !text-lg">
            Brewing your products... ☕
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="!min-h-screen !bg-gradient-to-br !from-gray-50 !via-white !to-stone-50 !py-8 !relative !overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="!absolute !inset-0 !opacity-5">
        <div className="!absolute !top-20 !left-10 !w-32 !h-32 !bg-gray-200 !rounded-full !blur-xl" />
        <div className="!absolute !bottom-20 !right-10 !w-48 !h-48 !bg-stone-200 !rounded-full !blur-2xl" />
      </div>

      <div className="!container !mx-auto !px-4 !relative !z-10">
        {/* Header */}
        <motion.div
          className="!text-center !mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="!text-5xl md:!text-5xl !font-bold !text-gray-800 !mb-4 !tracking-tight">
            Our Collection
          </h1>
          <p className="!text-gray-600 !text-xl !max-w-1xl !mx-auto !leading-relaxed">
            Discover premium brews from around the world, handpicked for your
            perfect sip.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          className="!flex !flex-col md:!flex-row !gap-4 !mb-8 !bg-white/80 !backdrop-blur-sm !rounded-2xl !p-4 !shadow-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="!relative !flex-1">
            <Search className="!absolute !left-3 !top-1/2 !-translate-y-1/2 !text-gray-500 !w-5 !h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="!w-full !pl-10 !pr-4 !py-3 !border !border-gray-200 !rounded-xl !focus:outline-none !focus:border-gray-400 !bg-white/50 !transition-colors"
            />
          </div>
          <div className="!relative">
            <Filter className="!absolute !left-3 !top-1/2 !-translate-y-1/2 !text-gray-500 !w-5 !h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="!w-full !pl-10 !pr-4 !py-3 !border !border-gray-200 !rounded-xl !focus:outline-none !focus:border-gray-400 !bg-white/50 !transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="!grid !grid-cols-1 md:!grid-cols-3 !gap-4 !mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="!bg-white/80 !backdrop-blur-sm !p-4 !rounded-xl !text-center !shadow-md">
            <p className="!text-2xl !font-bold !text-gray-800">
              {products?.length || 0}
            </p>
            <p className="!text-gray-600 !text-sm">Total Products</p>
          </div>
          <div className="!bg-white/80 !backdrop-blur-sm !p-4 !rounded-xl !text-center !shadow-md">
            <p className="!text-2xl !font-bold !text-gray-800">
              $
              {(products || []).reduce((sum, p) => sum + p.price, 0).toFixed(0)}
            </p>
            <p className="!text-gray-600 !text-sm">Total Value</p>
          </div>
          <div className="!bg-white/80 !backdrop-blur-sm !p-4 !rounded-xl !text-center !shadow-md">
            <p className="!text-2xl !font-bold !text-gray-800">
              {categories.length - 1}
            </p>
            <p className="!text-gray-600 !text-sm">Categories</p>
          </div>
        </motion.div>

        <ProductGrid
          products={filteredProducts}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />

        {/* Edit Product Modal */}
        {isEditing && editingProduct && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
            <motion.div
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Edit Product
                  </h2>
                  <button
                    onClick={handleEditCancel}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>

              <form onSubmit={handleEditSubmit} className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingProduct.title}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      name="price"
                      step="0.01"
                      defaultValue={editingProduct.price}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      name="category"
                      defaultValue={editingProduct.category}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="electronics">Electronics</option>
                      <option value="jewelery">Jewelry</option>
                      <option value="men's clothing">Men's Clothing</option>
                      <option value="women's clothing">Women's Clothing</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    defaultValue={editingProduct.description}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    defaultValue={editingProduct.image}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleEditCancel}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updateMutation.isPending}
                    className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {updateMutation.isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Edit size={18} />
                        Update Product
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
