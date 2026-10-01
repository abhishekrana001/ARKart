import { createContext, useState, useEffect } from "react";
import headphonesImg from "../assets/electronics.png";
import sneakersImg from "../assets/running_sneakers.jpg";

export const OrderContext = createContext();

const INITIAL_SAMPLE_ORDERS = [
  {
    id: "ARK-849201",
    date: "28 Sep 2026",
    status: "Delivered",
    paymentMethod: "UPI / Online Payment",
    total: 3199,
    customer: {
      name: "Abhishek",
      email: "abhishek@arkart.com",
      phone: "9876543210",
      address: "Flat 402, Green Valley Heights",
      city: "New Delhi",
      pincode: "110001",
    },
    items: [
      {
        id: 9,
        name: "Ultra-Lightweight Running Shoes",
        price: 3199,
        quantity: 1,
        image: sneakersImg,
        category: "shoes",
      },
    ],
  },
  {
    id: "ARK-923180",
    date: "30 Sep 2026",
    status: "Confirmed",
    paymentMethod: "Cash on Delivery",
    total: 1999,
    customer: {
      name: "Abhishek",
      email: "abhishek@arkart.com",
      phone: "9876543210",
      address: "Flat 402, Green Valley Heights",
      city: "New Delhi",
      pincode: "110001",
    },
    items: [
      {
        id: 1,
        name: "Wireless Noise-Canceling Headphones",
        price: 1999,
        quantity: 1,
        image: headphonesImg,
        category: "electronics",
      },
    ],
  },
];

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem("arkart_orders");
      if (savedOrders) return JSON.parse(savedOrders);
      localStorage.setItem("arkart_orders", JSON.stringify(INITIAL_SAMPLE_ORDERS));
      return INITIAL_SAMPLE_ORDERS;
    } catch {
      return INITIAL_SAMPLE_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("arkart_orders", JSON.stringify(orders));
    } catch {
      // LocalStorage error handling
    }
  }, [orders]);

  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const cancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "Cancelled" } : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, setOrders, addOrder, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
}