import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import { Link } from "react-router-dom";
import { 
  Package, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  XCircle,
  Truck
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import "./Orders.css";

function Orders() {
  const { orders, cancelOrder } = useContext(OrderContext);
  const { addToast } = useToast();

  const handleCancel = (orderId) => {
    if (window.confirm(`Are you sure you want to cancel order #${orderId}?`)) {
      cancelOrder(orderId);
      addToast(`Order #${orderId} was cancelled.`, "success");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return (
          <span className="order-status-badge status-delivered">
            <CheckCircle2 size={15} /> Delivered
          </span>
        );
      case "Cancelled":
        return (
          <span className="order-status-badge status-cancelled">
            <XCircle size={15} /> Cancelled
          </span>
        );
      case "Shipped":
        return (
          <span className="order-status-badge status-shipped">
            <Truck size={15} /> Out for Delivery
          </span>
        );
      default:
        return (
          <span className="order-status-badge status-confirmed">
            <Clock size={15} /> Processing
          </span>
        );
    }
  };

  return (
    <div className="orders-page-container">
      <div className="orders-title-block">
        <h1>My Orders</h1>
        <p>Track, manage, and review your previous ARKart orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty-card">
          <div className="orders-empty-icon">
            <Package size={42} />
          </div>
          <h2>No orders placed yet</h2>
          <p>
            When you purchase items from ARKart, your order receipts and shipping trackers will show up here.
          </p>
          <Link to="/products" className="orders-shop-btn">
            <span>Start Shopping</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card-box">
              {/* Order Card Header */}
              <div className="order-card-header">
                <div>
                  <span className="order-id-tag">#{order.id}</span>
                  <div className="order-meta-info">
                    <Calendar size={14} />
                    <span>Placed on {order.date}</span>
                  </div>
                </div>

                <div className="order-header-right">
                  {getStatusBadge(order.status || "Confirmed")}
                </div>
              </div>

              {/* Delivery Destination */}
              <div className="order-delivery-info">
                <MapPin size={16} className="pin-icon" />
                <span>
                  Delivering to: <strong>{order.customer?.name}</strong> • {order.customer?.address}, {order.customer?.city}
                </span>
              </div>

              {/* Order Items List */}
              <div className="order-items-grid">
                {order.items?.map((item) => (
                  <div key={item.id} className="order-item-row">
                    <div className="order-item-left">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="order-item-thumb"
                        />
                      )}
                      <div>
                        <strong className="order-item-title">{item.name}</strong>
                        <span className="order-item-qty">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="order-item-price">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Footer & Actions */}
              <div className="order-card-footer">
                <div className="order-payment-method">
                  <span>Payment:</span>
                  <strong>{order.paymentMethod || "Cash on Delivery"}</strong>
                </div>

                <div className="order-actions-group">
                  {order.status !== "Cancelled" && order.status !== "Delivered" && (
                    <button
                      className="cancel-order-btn"
                      onClick={() => handleCancel(order.id)}
                    >
                      Cancel Order
                    </button>
                  )}
                  <div className="order-total-amount">
                    Total: ₹{order.total.toLocaleString("en-IN")}
                  </div>
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
