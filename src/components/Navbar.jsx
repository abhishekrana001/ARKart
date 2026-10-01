import { useState, useContext, useEffect, useRef } from "react";
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
  LogOut,
  Sun,
  Moon 
} from "lucide-react";
import "./Navbar.css";
import Arkart from "../assets/arkart.png";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";

function Navbar() {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState("");

  const { totalItemCount } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { currentUser, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const totalWishlistCount = wishlist ? wishlist.length : 0;
  const navRef = useRef(null);

  // Close dropdowns when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setCategoryOpen(false);
        setAccountOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setCategoryOpen(false);
        setAccountOpen(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/products?search=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch("");
      setMenuOpen(false);
      setCategoryOpen(false);
      setAccountOpen(false);
    }
  };

  const closeDropdowns = () => {
    setCategoryOpen(false);
    setAccountOpen(false);
    setMenuOpen(false);
  };

  const toggleCategory = (e) => {
    e.stopPropagation();
    setCategoryOpen((prev) => !prev);
    setAccountOpen(false);
  };

  const toggleAccount = (e) => {
    e.stopPropagation();
    setAccountOpen((prev) => !prev);
    setCategoryOpen(false);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    const nextTheme = theme === "dark" ? "Light" : "Dark";
    addToast(`Switched to ${nextTheme} Mode`, "success", 2000);
  };

  return (
    <header className="navbar-header" ref={navRef}>
      <nav className="navbar">
        <Link to="/" className="name-logo" onClick={closeDropdowns}>
          <img src={Arkart} alt="ARKart logo" />
        </Link>

        {/* Desktop and Mobile navigation links */}
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

          <div className="category-wrapper">
            <button
              type="button"
              className={`category-btn ${categoryOpen ? "open" : ""}`}
              onClick={toggleCategory}
              aria-expanded={categoryOpen}
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

          {/* Theme Toggle Button */}
          <button
            className="action-icon-btn theme-toggle-btn"
            onClick={handleThemeToggle}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Dark/Light Mode"
          >
            {theme === "dark" ? (
              <Sun size={20} className="theme-icon sun-icon" />
            ) : (
              <Moon size={20} className="theme-icon moon-icon" />
            )}
          </button>

          <Link to="/wishlist" className="action-icon-btn cart-btn-wrapper" title="Wishlist">
            <Heart size={21} />
            {totalWishlistCount > 0 && (
              <span className="cart-badge wishlist-badge">{totalWishlistCount}</span>
            )}
          </Link>

          <Link to="/cart" className="action-icon-btn cart-btn-wrapper" title="Cart">
            <ShoppingBag size={21} />
            {totalItemCount > 0 && (
              <span className="cart-badge">{totalItemCount}</span>
            )}
          </Link>

          <div className="account-wrapper">
            <button
              type="button"
              className="action-icon-btn account-btn"
              onClick={toggleAccount}
              title={currentUser ? `Logged in as ${currentUser.name}` : "My Account"}
              aria-expanded={accountOpen}
            >
              <User size={21} />
              {currentUser && (
                <span className="user-nav-indicator" />
              )}
            </button>

            {accountOpen && (
              <div className="account-dropdown">
                {currentUser ? (
                  <div className="account-dropdown-user-info">
                    <p className="account-user-greeting">Signed in as</p>
                    <p className="account-user-name">
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
                      addToast("Signed out successfully", "success");
                    }}
                    className="account-logout-btn"
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