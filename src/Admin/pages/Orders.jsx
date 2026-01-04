import React, { useEffect, useState } from "react";
import axios from "axios";
import "../pages/cssOfPages/Order.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, customersRes, menuRes] = await Promise.all([
          axios.get("http://localhost:3002/orders"),
          axios.get("http://localhost:3002/customers"),
          axios.get("http://localhost:3002/menuItems"),
        ]);

        setOrders(ordersRes.data);
        setCustomers(customersRes.data);
        setMenuItems(menuRes.data);
      } catch (error) {
        console.error("Orders API Error:", error);
      }
    };

    fetchData();
  }, []);

  // ================= HELPERS =================
  const getCustomerName = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : "Unknown Customer";
  };

  const getItemName = (menuItemId) => {
    const item = menuItems.find(m => m.id === menuItemId);
    return item ? item.name : "Item";
  };

  // ================= FILTER =================
  const filteredOrders = orders.filter(order => {
    const itemsText = order.items
      .map(i => `${getItemName(i.menuItemId)} x${i.quantity}`)
      .join(", ");

    const textMatch = (
      order.id +
      getCustomerName(order.customerId) +
      itemsText +
      order.status +
      order.total
    )
      .toLowerCase()
      .includes(search.toLowerCase());

    const statusMatch =
      activeStatus === "all" || order.status === activeStatus;

    return textMatch && statusMatch;
  });

  // ================= COUNTS =================
  const counts = {
    all: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    progress: orders.filter(o => o.status === "progress").length,
    completed: orders.filter(o => o.status === "completed").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  };

  // ================= JSX =================
  return (
    <div className="main-content">
      <div className="orders-container">

        {/* SEARCH */}
        <div className="orders-search">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* TABS */}
        <div className="order-tabs">
          {["all", "pending", "progress", "completed", "cancelled"].map(status => (
            <button
              key={status}
              className={`tab ${activeStatus === status ? "active" : ""}`}
              onClick={() => setActiveStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} (
              <span className="count">{counts[status]}</span>)
            </button>
          ))}
        </div>

        {/* TABLE */}
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Time</th>
                <th>Total</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <tr key={order.id}>
                    <td className="id">#{order.id}</td>
                    <td className="bold">{getCustomerName(order.customerId)}</td>
                    <td>
                      {order.items.map((item, i) => (
                        <div key={i}>
                          {getItemName(item.menuItemId)} x{item.quantity}
                        </div>
                      ))}
                    </td>
                    <td>{order.date}</td>
                    <td>${order.total}</td>
                    <td>
                      <span className={`status ${order.status}`}>
                        {order.status === "pending" && "⏳ Pending"}
                        {order.status === "progress" && "⚙ In-Progress"}
                        {order.status === "completed" && "✔ Completed"}
                        {order.status === "cancelled" && "✖ Cancelled"}
                      </span>
                    </td>
                    <td>
                      <i className="bi bi-three-dots-vertical action"></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Orders;
