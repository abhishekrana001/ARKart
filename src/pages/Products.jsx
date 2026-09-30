import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Sparkles, Filter, X } from "lucide-react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import "./Products.css";

const CATEGORIES = [
  { id: "all", label: "All Products", icon: "✨" },
  { id: "electronics", label: "Electronics", icon: "⚡" },
  { id: "fashion", label: "Fashion", icon: "👔" },
  { id: "shoes", label: "Shoes", icon: "👟" },
  { id: "beauty", label: "Beauty", icon: "💄" },
  { id: "accessories", label: "Accessories", icon: "⌚" },
];

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  const querySearch = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState(querySearch);

  const handleCategoryChange = (categoryId) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId === "all") {
      params.delete("category");
    } else {
      params.set("category", categoryId);
    }
    setSearchParams(params);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      params.set("search", searchInput.trim());
    } else {
      params.delete("search");
    }
    setSearchParams(params);
  };

  const clearAllFilters = () => {
    setSearchInput("");
    setSearchParams({});
  };

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      activeCategory === "all" ||
      product.category.toLowerCase() === activeCategory.toLowerCase();

    const matchSearch =
      !querySearch ||
      product.name.toLowerCase().includes(querySearch.toLowerCase()) ||
      product.category.toLowerCase().includes(querySearch.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="products-page-wrapper">
      <div className="products-hero-bar">
        <div className="products-hero-content">
          <div className="products-badge">
            <Sparkles size={14} /> Curated Catalog
          </div>
          <h1>Explore Our Collection</h1>
          <p>Discover high-quality items designed to elevate your everyday lifestyle.</p>
        </div>

        <form className="products-search-bar" onSubmit={handleSearchSubmit}>
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, category..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => {
                setSearchInput("");
                const params = new URLSearchParams(searchParams);
                params.delete("search");
                setSearchParams(params);
              }}
            >
              <X size={16} />
            </button>
          )}
          <button type="submit" className="search-submit-btn">
            Search
          </button>
        </form>
      </div>

      <div className="products-filter-chips">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`filter-chip ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => handleCategoryChange(cat.id)}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="products-results-header">
        <p className="results-count">
          Showing <strong>{filteredProducts.length}</strong> items
          {activeCategory !== "all" && (
            <span> in <em>{activeCategory}</em></span>
          )}
          {querySearch && (
            <span> matching <em>"{querySearch}"</em></span>
          )}
        </p>

        {(activeCategory !== "all" || querySearch) && (
          <button className="reset-filters-btn" onClick={clearAllFilters}>
            <Filter size={14} /> Reset Filters
          </button>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="products-empty-state">
          <div className="empty-icon-circle">🔍</div>
          <h2>No matching products found</h2>
          <p>Try clearing your search terms or selecting another category.</p>
          <button className="reset-filters-btn large" onClick={clearAllFilters}>
            Show All Products
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;