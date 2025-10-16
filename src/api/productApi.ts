import axiosInstance from "./axiosInstance";

// Local state management for write operations since fakestoreapi.com doesn't persist changes
let localProducts: any[] = [];
let localDeletedIds: Set<number> = new Set();
let nextId = 1000; // Start with high ID to avoid conflicts with fake API

// Product type definition
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

// Get products from fake API and merge with local changes
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get("/products");
    const fakeProducts = response.data.map((product: any) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description || "A delicious coffee product",
      category: product.category,
      image: product.image,
      rating: product.rating,
    }));

    // Merge with local products and filter out deleted ones
    const allProducts = [...fakeProducts];

    // Add local products (new ones)
    localProducts.forEach((localProduct) => {
      const existingIndex = allProducts.findIndex(
        (p) => p.id === localProduct.id
      );
      if (existingIndex >= 0) {
        allProducts[existingIndex] = localProduct; // Update existing
      } else {
        allProducts.push(localProduct); // Add new
      }
    });

    // Filter out deleted products
    return allProducts.filter((product) => !localDeletedIds.has(product.id));
  } catch (error) {
    console.error("Error fetching products:", error);
    return localProducts.filter((product) => !localDeletedIds.has(product.id));
  }
};

export const getProduct = async (id: number): Promise<Product> => {
  const products = await getProducts();
  const product = products.find((p) => p.id === id);
  if (!product) {
    throw new Error(`Product with id ${id} not found`);
  }
  return product;
};

export const getCategories = async (): Promise<string[]> => {
  const products = await getProducts();
  return [...new Set(products.map((p) => p.category))];
};

export const getByCategory = async (cat: string): Promise<Product[]> => {
  const products = await getProducts();
  return products.filter((p) => p.category === cat);
};

// Add new product (stored locally since fake API doesn't support POST)
export const addProduct = async (
  payload: Omit<Product, "id">
): Promise<Product> => {
  const newProduct: Product = {
    ...payload,
    id: nextId++,
    rating: { rate: 0, count: 0 },
  };

  localProducts.push(newProduct);
  return newProduct;
};

// Update product (stored locally since fake API doesn't support PUT)
export const updateProduct = async (
  id: number,
  payload: Partial<Product>
): Promise<Product> => {
  const index = localProducts.findIndex((p) => p.id === id);
  if (index === -1) {
    // If not in local products, add it as an update
    const existingProduct = await getProduct(id).catch(() => null);
    if (!existingProduct) {
      throw new Error(`Product with id ${id} not found`);
    }

    const updatedProduct = { ...existingProduct, ...payload };
    localProducts.push(updatedProduct);
    return updatedProduct;
  }

  localProducts[index] = { ...localProducts[index], ...payload };
  return localProducts[index];
};

// Delete product (stored locally since fake API doesn't support DELETE)
export const deleteProduct = async (
  id: number
): Promise<{ message: string }> => {
  // Add to deleted set
  localDeletedIds.add(id);

  // Also remove from local products if it exists there
  const index = localProducts.findIndex((p) => p.id === id);
  if (index !== -1) {
    localProducts.splice(index, 1);
  }

  return { message: `Product ${id} deleted successfully` };
};
