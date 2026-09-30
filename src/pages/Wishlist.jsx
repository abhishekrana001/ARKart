import { useContext } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { WishlistContext } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

function Wishlist() {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div style={{ maxWidth: "1200px", margin: "40px auto 80px", padding: "0 24px" }}>
      <div style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: "800", color: "var(--text-main)", letterSpacing: "-0.02em" }}>
            My Wishlist
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "4px" }}>
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>
        {wishlist.length > 0 && (
          <Link
            to="/products"
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "var(--primary)",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            <span>Continue Shopping</span>
            <ArrowRight size={14} />
          </Link>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div style={{
          background: "#ffffff",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "70px 24px",
          boxShadow: "var(--shadow-sm)",
          textAlign: "center"
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "#fee2e2",
            color: "#ef4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px"
          }}>
            <Heart size={40} fill="#ef4444" />
          </div>

          <h2 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-main)", marginBottom: "8px" }}>
            Your Wishlist is Empty
          </h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "450px", margin: "0 auto 28px", lineHeight: "1.5" }}>
            Explore our collection and click the heart icon on any product to save your favorite items here.
          </p>

          <Link
            to="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 28px",
              background: "var(--primary)",
              color: "#ffffff",
              borderRadius: "var(--radius-full)",
              fontWeight: "700",
              boxShadow: "0 4px 14px rgba(79, 70, 229, 0.35)"
            }}
          >
            <span>Discover Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="products-grid">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
