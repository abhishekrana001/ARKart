import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Package, 
  LogIn,
  LogOut 
} from "lucide-react";
import "./Navbar.css";
import Arkart from "../assets/arkart.png";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState("");

  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const totalCartCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
  const totalWishlistCount = wishlist ? wishlist.length : 0;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/products?search=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch("");
    }
  };

  const closeDropdowns = () => {
    setCategoryOpen(false);
    setAccountOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      <nav className="navbar">
        <Link to="/" className="name-logo" onClick={closeDropdowns}>
          <img src={Arkart} alt="ARKart logo" />
        </Link>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <form className="mobile-search-box" onSubmit={handleSearchSubmit}>
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
            />
            <button type="submit">Go</button>
          </form>

          <Link to="/" onClick={closeDropdowns} className="nav-link-item">
            Home
          </Link>
          <Link to="/products" onClick={closeDropdowns} className="nav-link-item">
            Shop Now
          </Link>

          <div 
            className="category-wrapper" 
            onMouseLeave={() => setCategoryOpen(false)}
          >
            <button
              className={`category-btn ${categoryOpen ? "open" : ""}`}
              onClick={() => setCategoryOpen(!categoryOpen)}
            >
              Categories <ChevronDown size={16} className="chevron" />
            </button>

            {categoryOpen && (
              <div className="category-dropdown">
                <Link to="/products?category=electronics" onClick={closeDropdowns}>
                  ⚡ Electronics
                </Link>
                <Link to="/products?category=fashion" onClick={closeDropdowns}>
                  👔 Fashion
                </Link>
                <Link to="/products?category=shoes" onClick={closeDropdowns}>
                  👟 Shoes & Footwear
                </Link>
                <Link to="/products?category=beauty" onClick={closeDropdowns}>
                  ✨ Beauty & Personal Care
                </Link>
                <Link to="/products?category=accessories" onClick={closeDropdowns}>
                  ⌚ Accessories & Watches
                </Link>
              </div>
            )}
          </div>

          <Link to="/about" onClick={closeDropdowns} className="nav-link-item">
            About
          </Link>
          <Link to="/contact" onClick={closeDropdowns} className="nav-link-item">
            Contact
          </Link>
        </div>

        <div className="navbar-actions">
          <form className="search-box" onSubmit={handleSearchSubmit}>
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search products, brands..."
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
            />
            <button type="submit" aria-label="Search">
              Search
            </button>
          </form>

          <Link to="/wishlist" className="action-icon-btn cart-btn-wrapper" title="Wishlist">
            <Heart size={21} />
            {totalWishlistCount > 0 && (
              <span className="cart-badge wishlist-badge">{totalWishlistCount}</span>
            )}
          </Link>

          <Link to="/cart" className="action-icon-btn cart-btn-wrapper" title="Cart">
            <ShoppingBag size={21} />
            {totalCartCount > 0 && (
              <span className="cart-badge">{totalCartCount}</span>
            )}
          </Link>

          <div 
            className="account-wrapper" 
            onMouseLeave={() => setAccountOpen(false)}
          >
            <button
              className="action-icon-btn account-btn"
              onClick={() => setAccountOpen(!accountOpen)}
              title={currentUser ? `Logged in as ${currentUser.name}` : "My Account"}
            >
              <User size={21} />
              {currentUser && (
                <span className="user-nav-indicator" />
              )}
            </button>

            {accountOpen && (
              <div className="account-dropdown">
                {currentUser ? (
                  <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--border)", marginBottom: "4px" }}>
                    <p style={{ fontSize: "11px", color: "#64748b" }}>Signed in as</p>
                    <p style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {currentUser.name}
                    </p>
                  </div>
                ) : null}

                <Link to="/profile" onClick={closeDropdowns}>
                  <User size={16} /> {currentUser ? "My Profile" : "Account"}
                </Link>
                <Link to="/orders" onClick={closeDropdowns}>
                  <Package size={16} /> My Orders
                </Link>
                <Link to="/wishlist" onClick={closeDropdowns}>
                  <Heart size={16} /> Wishlist
                </Link>
                <div className="dropdown-divider" />
                {currentUser ? (
                  <button
                    onClick={() => {
                      logout();
                      closeDropdowns();
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      width: "100%",
                      padding: "10px 12px",
                      border: "none",
                      background: "none",
                      color: "#b91c1c",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      borderRadius: "var(--radius-sm)",
                      textAlign: "left"
                    }}
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                ) : (
                  <Link to="/login" onClick={closeDropdowns} className="login-link">
                    <LogIn size={16} /> Login / Register
                  </Link>
                )}
              </div>
            )}
          </div>

          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;