import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { get } from "../../Services/ApiEndPoint";

export default function Products() {
  const [isMobile, setIsMobile] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [loading, setLoading] = useState(false); // Track loading state for filtering

  const filterOptions = ["All", "BedSide Table", "Chair and Couch", "Other"];
  const itemsPerPage = 7; // Number of items per page

  const colSpanPatternDesktop = [1, 1, 1, 2, 1, 1, 2];
  const rowSpanPatternDesktop = [2, 2, 2, 2, 2, 2, 2];

  const colSpanPatternMobile = [2, 2, 2, 2, 2, 2];
  const rowSpanPatternMobile = [1, 2, 1, 2, 1, 2];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const request = await get("/api/v1/products/");
        const data = request.data;

        const preparedProducts = data.map((product) => ({
          image: product.images[0]?.url || "",
          name: product.name,
          price: `$${product.price}`,
          category: product.category,
          _id: product._id,
          stoke: product.stoke,
        }));

        setProducts(preparedProducts);
        setFilteredProducts(applyGridPatterns(preparedProducts));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const applyGridPatterns = (items) => {
    const colSpanPattern = isMobile
      ? colSpanPatternMobile
      : colSpanPatternDesktop;
    const rowSpanPattern = isMobile
      ? rowSpanPatternMobile
      : rowSpanPatternDesktop;

    return items.map((product, index) => ({
      ...product,
      colSpan: colSpanPattern[index % colSpanPattern.length],
      rowSpan: rowSpanPattern[index % rowSpanPattern.length],
    }));
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
    setLoading(true); // Start loading spinner

    setTimeout(() => {
      if (filter === "All") {
        setFilteredProducts(applyGridPatterns(products));
      } else {
        const filtered = products.filter((product) =>
          product.category.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredProducts(applyGridPatterns(filtered));
      }
      setLoading(false); // Stop loading spinner
    }, 1000); // Simulate delay
  };

  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="flex flex-col w-full p-4 items-center">
      {/* Filter Buttons */}
      <div className="flex justify-end gap-3 w-full mb-4">
        {filterOptions.map((item) => (
          <motion.button
            key={item}
            onClick={() => handleFilterChange(item)}
            className={`px-2 md:px-4 md:py-2 text-sm md:text-xl tracking-wider font-bold rounded-lg shadow-md ${
              selectedFilter === item
                ? "bg-secondary-100 text-white"
                : "bg-secondary-200 text-secondary-100"
            }`}
            initial={{ backgroundColor: "#EBE2DB", color: "#523B2F" }}
            whileHover={{ backgroundColor: "#523B2F", color: "#EBE2DB" }}
            transition={{ duration: 0.5 }}
          >
            {item}
          </motion.button>
        ))}
      </div>

      {/* Product Cards or Loading Spinner */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div
          className="w-full flex flex-col justify-center md:grid gap-8 p-2 md:p-4"
          style={
            isMobile
              ? { gridTemplateColumns: "1fr" }
              : {
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gridAutoRows: "150px",
                }
          }
        >
          <ProductCard products={visibleProducts} />
        </div>
      )}

      {/* Pagination Controls */}
      <div className="w-full pr-4 flex justify-end mt-4 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-secondary-200 text-secondary-100 rounded-lg shadow-md"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg shadow-md ${
              currentPage === i + 1
                ? "bg-secondary-100 text-white"
                : "bg-secondary-200 text-secondary-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-4 py-2 bg-secondary-200 text-secondary-100 rounded-lg shadow-md"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

const LoadingSpinner = () => (
  <div className="w-full flex justify-center items-center py-10">
    <div className="loader border-t-4 border-secondary-100 rounded-full w-12 h-12 animate-spin"></div>
  </div>
);

const SkeletonLoader = () => (
  <div className="w-full h-full bg-gray-300 animate-pulse rounded-lg"></div>
);
