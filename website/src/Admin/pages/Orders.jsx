import React, { useEffect, useState } from "react";
import "../pages/cssOfPages/Order.css";

function Orders(){
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");

  const ordersData = [
    { id: "#1234", customer: "John Doe", items: "Cappuccino x2, Croissant", table: "T-5", time: "10:30 AM", total: "$15.00", status: "pending" },
    { id: "#1235", customer: "Jane Smith", items: "Latte, Muffin", table: "T-3", time: "10:25 AM", total: "$8.50", status: "progress" },
    { id: "#1236", customer: "Mike Johnson", items: "Espresso x3, Americano x2", table: "T-8", time: "10:15 AM", total: "$18.00", status: "completed" },
    { id: "#1237", customer: "Sarah Wilson", items: "Green Tea", table: "T-1", time: "10:10 AM", total: "$3.50", status: "completed" },
    { id: "#1238", customer: "Tom Brown", items: "Mocha, Blueberry Muffin x2", table: "T-2", time: "10:05 AM", total: "$12.50", status: "cancelled" }
  ];

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredOrders = ordersData.filter(order => {
    const textMatch = (
      order.id +
      order.customer +
      order.items +
      order.table +
      order.time +
      order.total +
      order.status
    )
      .toLowerCase()
      .includes(search.toLowerCase());

    const statusMatch =
      activeStatus === "all" || order.status === activeStatus;

    return textMatch && statusMatch;
  });

  /* ---------------- COUNTS ---------------- */
  const counts = {
    all: ordersData.length,
    pending: ordersData.filter(o => o.status === "pending").length,
    progress: ordersData.filter(o => o.status === "progress").length,
    completed: ordersData.filter(o => o.status === "completed").length,
    cancelled: ordersData.filter(o => o.status === "cancelled").length
  };

  return (
    <div className="main-content">

     

      {/* ORDERS CONTAINER */}
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
                <th>Table</th>
                <th>Time</th>
                <th>Total</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr key={index}>
                    <td className="id">{order.id}</td>
                    <td className="bold">{order.customer}</td>
                    <td>{order.items}</td>
                    <td><span className="tag">{order.table}</span></td>
                    <td>{order.time}</td>
                    <td>{order.total}</td>
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
                  <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
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
};

export default Orders;
