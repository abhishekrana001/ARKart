import products from "../data/products"
import ProductCard from "../components/ProductCard"
import "./Products.css";
import { useSearchParams } from "react-router-dom"
import { useState } from "react";

function Products() {
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [searchParams] = useSearchParams();

    const category = searchParams.get("category");

    const filteredProducts = products.filter((product) => {
        const matchCategory =
            !category || product.category === category;

        const matchSearch =
            product.name.toLowerCase().includes(search.toLowerCase());

        return matchCategory && matchSearch;
    });

  return (
    <section className="products-page">
        <h1>All Products</h1>

        <div className="search-container">
            <input
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />

            <button onClick={() => setSearch(searchInput)}>Search</button>
        </div>

        <div className="products-container">
            {filteredProducts.map((product) => (
                <ProductCard
                 key={product.id}
                 product={product}
                />
            ))}
        </div>
    </section>
  )
}

export default Products