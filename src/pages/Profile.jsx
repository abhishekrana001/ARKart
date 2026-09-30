import { useContext } from "react";
import { Link } from "react-router-dom";
import { 
  Package, 
  Heart, 
  ShoppingBag, 
  LogOut, 
  ArrowRight, 
  Phone, 
  Mail, 
  Calendar 
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { OrderContext } from "../context/OrderContext";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import Login from "./Login";

function Profile() {
  const { currentUser, logout } = useContext(AuthContext);
  const { orders } = useContext(OrderContext);
  const { wishlist } = useContext(WishlistContext);
  const { cart } = useContext(CartContext);

  // If user is not logged in, show Login/Register tabs
  if (!currentUser) {
    return <Login />;
  }

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto 80px", padding: "0 24px" }}>
      {/* Profile Header Card */}
      <div style={{
        background: "#ffffff",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "36px 30px",
        boxShadow: "var(--shadow-sm)",
        marginBottom: "24px"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          flexWrap: "wrap",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "24px",
          marginBottom: "24px"
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            fontWeight: "800",
            flexShrink: 0,
            boxShadow: "0 6px 18px rgba(79, 70, 229, 0.35)"
          }}>
            {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
          </div>

          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "26px", fontWeight: "800", color: "var(--text-main)", marginBottom: "4px" }}>
              {currentUser.name}
            </h1>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", color: "var(--text-muted)", fontSize: "14px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Mail size={15} color="var(--primary)" />
                {currentUser.email}
              </span>
              {currentUser.phone && (
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Phone size={15} color="var(--primary)" />
                  {currentUser.phone}
                </span>
              )}
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Calendar size={15} color="var(--primary)" />
                Member since {currentUser.joined || "Recent"}
              </span>
            </div>
          </div>

          <button
            onClick={logout}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              background: "#fee2e2",
              color: "#b91c1c",
              border: "none",
              borderRadius: "var(--radius-full)",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px"
        }}>
          <Link
            to="/orders"
            style={{
              background: "#f8fafc",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "18px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              transition: "all 0.2s"
            }}
          >
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "var(--radius-sm)",
              background: "var(--primary-light)",
              color: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <Package size={22} />
            </div>
            <div>
              <strong style={{ display: "block", fontSize: "20px", color: "var(--text-main)" }}>
                {orders.length}
              </strong>
              <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Total Orders</span>
            </div>
          </Link>

          <Link
            to="/wishlist"
            style={{
              background: "#f8fafc",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "18px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              transition: "all 0.2s"
            }}
          >
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "var(--radius-sm)",
              background: "#fee2e2",
              color: "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <Heart size={22} />
            </div>
            <div>
              <strong style={{ display: "block", fontSize: "20px", color: "var(--text-main)" }}>
                {wishlist.length}
              </strong>
              <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Saved Items</span>
            </div>
          </Link>

          <Link
            to="/cart"
            style={{
              background: "#f8fafc",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "18px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              transition: "all 0.2s"
            }}
          >
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "var(--radius-sm)",
              background: "#dcfce7",
              color: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <ShoppingBag size={22} />
            </div>
            <div>
              <strong style={{ display: "block", fontSize: "20px", color: "var(--text-main)" }}>
                {totalCartCount}
              </strong>
              <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>In Your Cart</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Account Navigation List */}
      <div style={{
        background: "#ffffff",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "10px",
        boxShadow: "var(--shadow-sm)"
      }}>
        <Link
          to="/orders"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 18px",
            borderRadius: "var(--radius-md)",
            color: "var(--text-main)",
            fontWeight: "600",
            fontSize: "15px",
            borderBottom: "1px solid #f1f5f9"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Package size={20} color="var(--primary)" />
            <span>My Orders & Order Tracking</span>
          </div>
          <ArrowRight size={18} color="#94a3b8" />
        </Link>

        <Link
          to="/wishlist"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 18px",
            borderRadius: "var(--radius-md)",
            color: "var(--text-main)",
            fontWeight: "600",
            fontSize: "15px",
            borderBottom: "1px solid #f1f5f9"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Heart size={20} color="#ef4444" />
            <span>My Wishlist</span>
          </div>
          <ArrowRight size={18} color="#94a3b8" />
        </Link>

        <Link
          to="/cart"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 18px",
            borderRadius: "var(--radius-md)",
            color: "var(--text-main)",
            fontWeight: "600",
            fontSize: "15px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <ShoppingBag size={20} color="#10b981" />
            <span>View Shopping Cart</span>
          </div>
          <ArrowRight size={18} color="#94a3b8" />
        </Link>
      </div>
    </div>
  );
}

export default Profile;
