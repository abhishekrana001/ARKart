import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import { Link } from "react-router-dom";
import { Package, ArrowRight, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import "./Orders.css";

function Orders() {
  const { orders } = useContext(OrderContext);

  return (
    <div className="orders-page-container">
      <div className="orders-title-block" style={{ marginBottom: "24px" }}>
        <h1>My Orders</h1>
        <p>Track, manage, and review your previous ARKart orders</p>
      </div>

      {orders.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "80px 20px",
          background: "#ffffff",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)"
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            background: "var(--primary-light)",
            color: "var(--primary)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px"
          }}>
            <Package size={40} />
          </div>
          <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "8px" }}>No orders placed yet</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
            When you purchase items from ARKart, they will show up here.
          </p>
          <Link
            to="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 28px",
              background: "var(--primary)",
              color: "#ffffff",
              borderRadius: "var(--radius-full)",
              fontWeight: "700",
              boxShadow: "0 4px 14px rgba(79, 70, 229, 0.35)"
            }}
          >
            <span>Start Shopping</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                background: "#ffffff",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "24px",
                boxShadow: "var(--shadow-sm)"
              }}
            >
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
                borderBottom: "1px solid var(--border)",
                paddingBottom: "16px",
                marginBottom: "20px"
              }}>
                <div>
                  <span style={{
                    display: "inline-block",
                    fontSize: "12px",
                    fontWeight: "700",
                    background: "var(--primary-light)",
                    color: "var(--primary)",
                    padding: "3px 10px",
                    borderRadius: "var(--radius-full)",
                    marginBottom: "6px"
                  }}>
                    #{order.id}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-muted)", fontSize: "13px" }}>
                    <Calendar size={14} />
                    <span>Placed on {order.date}</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "#dcfce7", color: "#15803d", padding: "6px 14px", borderRadius: "var(--radius-full)", fontSize: "13px", fontWeight: "700" }}>
                  <CheckCircle2 size={16} />
                  <span>{order.status || "Confirmed"}</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", color: "var(--text-muted)", fontSize: "13px", marginBottom: "18px" }}>
                <MapPin size={16} style={{ flexShrink: 0, marginTop: "2px", color: "var(--primary)" }} />
                <span>Delivering to: <strong>{order.customer?.name}</strong> • {order.customer?.address}, {order.customer?.city}</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", background: "#f8fafc", padding: "16px", borderRadius: "var(--radius-md)" }}>
                {order.items?.map((item) => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: "38px", height: "38px", objectFit: "contain", background: "#ffffff", borderRadius: "6px", padding: "2px" }}
                        />
                      )}
                      <div>
                        <strong style={{ color: "var(--text-main)" }}>{item.name}</strong>
                        <span style={{ color: "var(--text-muted)", marginLeft: "8px" }}>× {item.quantity}</span>
                      </div>
                    </div>
                    <span style={{ fontWeight: "700", color: "var(--text-main)" }}>
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "18px", paddingTop: "14px", borderTop: "1px dashed var(--border)" }}>
                <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>Payment: {order.paymentMethod || "Cash on Delivery"}</span>
                <div style={{ fontSize: "18px", fontWeight: "800", color: "var(--primary)" }}>
                  Total: ₹{order.total.toLocaleString("en-IN")}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
