import { useState, useEffect } from "react";
function useProducts() {
  // State to store fetched products
  const [products, setProducts] = useState([]);

  // Loading state for fetch process
  const [loading, setLoading] = useState(true);

  // Error state to capture any fetch errors
  const [error, setError] = useState(null);

  useEffect(() => {
    // Async function to fetch products
    const fetchProducts = async () => {
      try {
        setLoading(true); 
        setError(null);   

        const response = await fetch("http://localhost:5000/api/products");

        // Check if response is ok
        if (!response.ok) {
          throw new Error(`Failed to fetch products. Status: ${response.status}`);
        }

        const data = await response.json();

        // Ensure data.products exists and is an array
        if (!data || !Array.isArray(data)) {
          throw new Error("Invalid data format received from API");
        }

        setProducts(data); // Save products
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false); // Stop loading in both success or error
      }
    };

    fetchProducts();
  }, []); // Run once on component mount

  return { products, loading, error };
}

export default useProducts;
