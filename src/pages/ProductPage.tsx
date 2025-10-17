// src/pages/ProductPage.tsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, deleteProduct, updateProduct } from "../api/productApi";
import type { Product } from "../api/productApi";
import { motion } from "framer-motion";
import { Search, Filter, Edit, Trash2, Check, AlertCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast"; // <-- Add this
import ProductGrid from "../components/ProductGrid";

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [pendingEditData, setPendingEditData] = useState<Partial<Product> | null>(null);
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
      toast.success("Product deleted successfully!", { icon: <Check className="w-5 h-5" /> });
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    },
    onError: (error: any) => {
      toast.error(`Error deleting product: ${error.message}`, { icon: <AlertCircle className="w-5 h-5" /> });
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Product> }) =>
      updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated successfully!", { icon: <Check className="w-5 h-5" /> });
      setIsEditing(false);
      setEditingProduct(null);
      setShowEditConfirm(false);
      setPendingEditData(null);
    },
    onError: (error: any) => {
      toast.error(`Error updating product: ${error.message}`, { icon: <AlertCircle className="w-5 h-5" /> });
      setShowEditConfirm(false);
      setPendingEditData(null);
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

  const handleDelete = (id: number) => {
    setProductToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (productToDelete) deleteMutation.mutate(productToDelete);
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

    setPendingEditData(updatedData);
    setShowEditConfirm(true);
  };

  const confirmUpdate = () => {
    if (editingProduct && pendingEditData) {
      updateMutation.mutate({ id: editingProduct.id, data: pendingEditData });
    }
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
    <>
      <Toaster /> 
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
            <h1 className="!text-5xl md:!text-5xl !font-bold !mb-4 tracking-wide bg-clip-text text-transparent 
  !bg-gradient-to-r !from-[#7a5a53] !via-[#a9887f] !to-[#c9a79b] drop-shadow-md animate-text-pulse">
              Our Collection
            </h1>
            <p className="!text-[#7a5a53] !text-xl !max-w-1xl !mx-auto !leading-relaxed">
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
    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    {/* Total Products */}
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="bg-white/90 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-gray-200"
    >
      <p className="text-3xl font-bold text-blue-600">{products?.length || 0}</p>
      <p className="text-gray-600 text-sm mt-1">Total Products</p>
    </motion.div>

    {/* Total Value */}
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="bg-white/90 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-gray-200"
    >
      <p className="text-3xl font-bold text-green-600">
        $
        {(products || []).reduce((sum, p) => sum + p.price, 0).toFixed(0)}
      </p>
      <p className="text-gray-600 text-sm mt-1">Total Value</p>
    </motion.div>

    {/* Categories */}
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="bg-white/90 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-gray-200"
    >
      <p className="text-3xl font-bold text-purple-600">{categories.length - 1}</p>
      <p className="text-gray-600 text-sm mt-1">Categories</p>
    </motion.div>
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
                  {/* ... (form fields remain unchanged) ... */}
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
                      className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit size={18} />
                      Update Product
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

          {/* Edit Confirmation Modal */}
          {showEditConfirm && (
            <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Update</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to save these changes?</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowEditConfirm(false);
                      setPendingEditData(null);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmUpdate}
                    disabled={updateMutation.isPending}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {updateMutation.isPending ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Check size={18} />
                    )}
                    Confirm
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
              >
                <div className="flex items-center mb-4">
                  <Trash2 className="w-6 h-6 text-red-500 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">Confirm Deletion</h3>
                </div>
                <p className="text-gray-600 mb-6">This action cannot be undone. Delete this product?</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setProductToDelete(null);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={deleteMutation.isPending}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {deleteMutation.isPending ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 size={18} />
                    )}
                    Delete
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;