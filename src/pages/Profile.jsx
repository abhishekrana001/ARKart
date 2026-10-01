import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { 
  Package, 
  Heart, 
  ShoppingBag, 
  LogOut, 
  ArrowRight, 
  Phone, 
  Mail, 
  Calendar,
  MapPin,
  Edit3,
  Check,
  X
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { OrderContext } from "../context/OrderContext";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import Login from "./Login";
import "./Profile.css";

function Profile() {
  const { currentUser, logout, updateProfile } = useContext(AuthContext);
  const { orders } = useContext(OrderContext);
  const { wishlist } = useContext(WishlistContext);
  const { totalItemCount } = useContext(CartContext);
  const { addToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: currentUser?.name || "",
    phone: currentUser?.phone || "",
    address: currentUser?.address || "",
    city: currentUser?.city || "",
    pincode: currentUser?.pincode || "",
  });

  // If user is not logged in, show Login/Register tabs
  if (!currentUser) {
    return <Login />;
  }

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!editData.name.trim()) {
      addToast("Name cannot be empty", "error");
      return;
    }

    updateProfile(editData);
    setIsEditing(false);
    addToast("Profile details updated successfully!", "success");
  };

  const handleCancelEdit = () => {
    setEditData({
      name: currentUser.name || "",
      phone: currentUser.phone || "",
      address: currentUser.address || "",
      city: currentUser.city || "",
      pincode: currentUser.pincode || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-page-container">
      {/* Profile Header Card */}
      <div className="profile-header-card">
        <div className="profile-user-main">
          <div className="profile-avatar-circle">
            {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
          </div>

          <div className="profile-user-info">
            <h1 className="profile-user-name">
              {currentUser.name}
            </h1>
            <div className="profile-user-badges">
              <span className="profile-badge-item">
                <Mail size={15} color="var(--primary)" />
                {currentUser.email}
              </span>
              {currentUser.phone && (
                <span className="profile-badge-item">
                  <Phone size={15} color="var(--primary)" />
                  {currentUser.phone}
                </span>
              )}
              <span className="profile-badge-item">
                <Calendar size={15} color="var(--primary)" />
                Member since {currentUser.joined || "Recent"}
              </span>
            </div>
          </div>

          <div className="profile-header-actions">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="profile-edit-btn"
                title="Edit your contact & address info"
              >
                <Edit3 size={15} />
                <span>Edit Profile</span>
              </button>
            )}

            <button
              onClick={() => {
                logout();
                addToast("Signed out successfully", "success");
              }}
              className="profile-signout-btn"
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Edit Profile Form */}
        {isEditing && (
          <form className="profile-edit-form" onSubmit={handleSaveProfile}>
            <h3>Edit Personal Information</h3>
            <div className="profile-edit-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={editData.phone}
                  onChange={handleEditChange}
                  placeholder="e.g. 9876543210"
                />
              </div>

              <div className="form-group full-width">
                <label>Default Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={editData.address}
                  onChange={handleEditChange}
                  placeholder="House No, Street, Locality"
                />
              </div>

              <div className="form-group">
                <label>City & State</label>
                <input
                  type="text"
                  name="city"
                  value={editData.city}
                  onChange={handleEditChange}
                  placeholder="e.g. New Delhi"
                />
              </div>

              <div className="form-group">
                <label>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={editData.pincode}
                  onChange={handleEditChange}
                  placeholder="e.g. 110001"
                />
              </div>
            </div>

            <div className="profile-edit-actions">
              <button type="submit" className="save-profile-btn">
                <Check size={16} /> Save Changes
              </button>
              <button
                type="button"
                className="cancel-profile-btn"
                onClick={handleCancelEdit}
              >
                <X size={16} /> Cancel
              </button>
            </div>
          </form>
        )}

        {/* Saved Address Preview */}
        {!isEditing && currentUser.address && (
          <div className="profile-saved-address">
            <div className="address-header">
              <MapPin size={16} color="var(--primary)" />
              <strong>Default Delivery Destination:</strong>
            </div>
            <p>
              {currentUser.address}, {currentUser.city} {currentUser.pincode}
            </p>
          </div>
        )}

        {/* Quick Stats Grid */}
        <div className="profile-stats-grid">
          <Link to="/orders" className="profile-stat-card">
            <div className="stat-icon-wrap stat-orders">
              <Package size={22} />
            </div>
            <div>
              <strong className="stat-count">{orders.length}</strong>
              <span className="stat-label">Total Orders</span>
            </div>
          </Link>

          <Link to="/wishlist" className="profile-stat-card">
            <div className="stat-icon-wrap stat-wishlist">
              <Heart size={22} />
            </div>
            <div>
              <strong className="stat-count">{wishlist.length}</strong>
              <span className="stat-label">Saved Wishlist</span>
            </div>
          </Link>

          <Link to="/cart" className="profile-stat-card">
            <div className="stat-icon-wrap stat-cart">
              <ShoppingBag size={22} />
            </div>
            <div>
              <strong className="stat-count">{totalItemCount}</strong>
              <span className="stat-label">In Your Cart</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Account Navigation List */}
      <div className="profile-nav-card">
        <Link to="/orders" className="profile-nav-link">
          <div className="nav-link-left">
            <Package size={20} color="var(--primary)" />
            <span>My Orders & Order Tracking</span>
          </div>
          <ArrowRight size={18} className="arrow-icon" />
        </Link>

        <Link to="/wishlist" className="profile-nav-link">
          <div className="nav-link-left">
            <Heart size={20} color="#ef4444" />
            <span>My Wishlist</span>
          </div>
          <ArrowRight size={18} className="arrow-icon" />
        </Link>

        <Link to="/cart" className="profile-nav-link no-border">
          <div className="nav-link-left">
            <ShoppingBag size={20} color="#10b981" />
            <span>View Shopping Cart</span>
          </div>
          <ArrowRight size={18} className="arrow-icon" />
        </Link>
      </div>
    </div>
  );
}

export default Profile;
