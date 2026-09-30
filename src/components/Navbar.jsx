import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Arkart from "../assets/arkart.png"

function Navbar() {
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">

      <Link to="/" className="name-logo">
        <img src={Arkart} alt="logo" />
      </Link>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/products">Shop Now</Link>
        <div className="category-wrapper">

        <button
            className="category-btn"
            onClick={() => setCategoryOpen(!categoryOpen)}>
            Categories ▾
        </button>

        {categoryOpen && (
            <div className="category-dropdown">

            <Link to="/products?category=electronics">
                Electronics
            </Link>

            <Link to="/products?category=fashion">
                Fashion
            </Link>

            <Link to="/products?category=shoes">
                Shoes
            </Link>

            <Link to="/products?category=beauty">
                Beauty
            </Link>

            <Link to="/products?category=accessories">
                Accessories
            </Link>

            </div>
        )}

        </div>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
        
    <div className="navbar-actions">
        <div className="search-box">
            <input
                type="text"
                placeholder="Search products..."
            />

            <button>🔍</button>
        </div>

        <Link to="/wishlist" className="nav-icon wish-icon">
        ❤️
        </Link>

        <Link to="/cart" className="nav-icon">
        🛒
        </Link>

        <div className="account-wrapper">

            <button
             className="account-btn"
             onClick={() => setAccountOpen(!accountOpen)}
            >
            👤
            </button>

            {accountOpen && (
                <div className="account-dropdown">

                <Link to="/products?category=electronics">
                    👤 My Profile
                </Link>

                <Link to="/products?category=fashion">
                    📦 My Orders
                </Link>

                <Link to="/products?category=shoes">
                    ❤️ Wishlist
                </Link>

                <Link to="/products?category=beauty">
                    🔑 Login
                </Link>

                </div>
            )}
        
        </div>
    </div>
        <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
        >
            ☰
        </button>

    </nav>
  );
}

export default Navbar;