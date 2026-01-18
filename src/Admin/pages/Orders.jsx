import React, { useEffect, useState } from "react";
import axios from "axios";
import "../pages/cssOfPages/Order.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);


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

  // ================= HELPERS (FIXED ID MATCH) =================
  const getCustomerName = (customerId) => {
    if (!customerId || customers.length === 0) return "Unknown Customer";

    const customer = customers.find(
      c => String(c.id) === String(customerId)
    );

    return customer?.name || "Unknown Customer";
  };


  const getItemName = (menuItemId) => {
    if (!menuItemId || menuItems.length === 0) return "Item";

    const item = menuItems.find(
      m => String(m.id) === String(menuItemId)
    );

    return item?.name || "Item";
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
      order.totalAmount
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
                <th>Date</th>
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
                    <td className="bold">
                      {getCustomerName(order.customerId)}
                    </td>
                    <td>
                      {order.items.map((item, i) => (
                        <div key={i}>
                          {getItemName(item.menuItemId)} x ({item.quantity})
                        </div>
                      ))}
                    </td>
                    <td>{order.date}</td>
                    <td>${order.totalAmount}</td>
                    <td>
                      <span className={`status ${order.status}`}>
                        {order.status === "pending" && "⏳ Pending"}
                        {order.status === "progress" && "⚙ In-Progress"}
                        {order.status === "completed" && "✔ Completed"}
                        {order.status === "cancelled" && "✖ Cancelled"}
                      </span>
                    </td>
                    <td>
                      <i
                        className="bi bi-three-dots-vertical action"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setSelectedOrder(order);
                          setModalOpen(true);
                        }}
                      ></i>
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
          {modalOpen && selectedOrder && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Order Details</h3>
                <p><strong>Order ID:</strong> #{selectedOrder.id}</p>
                {/* Customer */}
                <h4>Customer_Details :</h4>
                <p><strong>Customer_Name :</strong> {getCustomerName(selectedOrder.customerId)}</p>
                <p><strong>Email :</strong> {selectedOrder.customer?.email}</p>
                <p><strong>Phone :</strong> {selectedOrder.customer?.phone}</p>

                {/* Items */}
                <h4>Items</h4>

<div className="order-items">
  {selectedOrder.items.map((item, i) => {
    const menuItem = menuItems.find(
      m => String(m.id) === String(item.menuItemId)
    );

    return (
      <div className="order-item-card" key={i}>
        <img
          src={menuItem?.image || "/img/placeholder.png"}
          alt={menuItem?.name}
        />

        <div className="order-item-info">
          <h5>{menuItem?.name}</h5>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.price}</p>
        </div>
      </div>
    );
  })}
</div>


                {/* Shipping */}
                <h4>Shipping_Details :</h4>
                <p>{selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state}, {selectedOrder.shippingAddress?.zip}, {selectedOrder.shippingAddress?.country}</p>

                {/* Payment */}
                <h4>Payment_Method :</h4>
                <p>{selectedOrder.payment?.method}</p>

                {/* Total */}
                <h4>Total_Amount :</h4>
                <p>${selectedOrder.totalAmount}</p>

                {/* Status Update */}
                <p>
                  <strong>Status:</strong>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) =>
                      setSelectedOrder({ ...selectedOrder, status: e.target.value })
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="progress">In-Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </p>

                {/* Actions */}
                <div className="modal-actions" style={{ marginTop: "20px", textAlign: "right" }}>
                  <button
                    onClick={async () => {
                      try {
                        await axios.patch(
                          `http://localhost:3002/orders/${selectedOrder.id}`,
                          { status: selectedOrder.status }
                        );
                        // refresh orders
                        const res = await axios.get("http://localhost:3002/orders");
                        setOrders(res.data);
                        setModalOpen(false);
                      } catch (err) {
                        console.error("Update failed:", err);
                      }
                    }}
                    style={{
                      padding: "8px 16px",
                      marginRight: "10px",
                      backgroundColor: "#c79c60",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer"
                    }}
                  >
                    Update
                  </button>

                  <button
                    onClick={() => setModalOpen(false)}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#eee",
                      color: "#333",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer"
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Orders;
