import { useEffect, useState } from "react";
import axios from "axios";
import "../pages/cssOfPages/Customers.css";

const Customers = () => {
  // ================= STATES =================
  const [search, setSearch] = useState(""); // for search input
  const [customers, setCustomers] = useState([]); // from customers API
  const [orders, setOrders] = useState([]); // from orders API

  // ================= FETCH CUSTOMERS =================
  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:3002/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  // ================= FETCH ORDERS =================
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3002/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  // ================= RUN ON COMPONENT MOUNT =================
  useEffect(() => {
    fetchCustomers();
    fetchOrders();
  }, []);

  // ================= HELPER FUNCTIONS =================
  // Get all orders for a specific customer
  const getCustomerOrders = (customerId) =>
    orders.filter((o) => o.customerId === customerId);

  // Count of orders
  const getOrderCount = (customerId) => getCustomerOrders(customerId).length;

  // Total spent by customer
  const getTotalSpent = (customerId) =>
    getCustomerOrders(customerId).reduce((sum, o) => sum + (o.total || 0), 0);

  // Filter customers based on search input
  const filteredCustomers = customers.filter((c) =>
    `${c.name} ${c.email} ${c.loyalty} ${c.lastVisit}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ================= STATS =================
  const totalCustomers = customers.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const avgOrderValue =
    totalCustomers > 0 ? (totalRevenue / totalCustomers).toFixed(2) : 0;

  return (
    <div className="main-content">
      <div className="customer-section">

        {/* ================= STATS CARDS ================= */}
        <div className="stats-row">
          <div className="stat-card">
            <h3>Total Customers</h3>
            <div className="value">{totalCustomers}</div>
          </div>

          <div className="stat-card">
            <h3>Total Revenue</h3>
            <div className="value" style={{ color: "#00D1C1" }}>
              ${totalRevenue.toFixed(2)}
            </div>
          </div>

          <div className="stat-card">
            <h3>Avg. Order Value</h3>
            <div className="value">${avgOrderValue}</div>
          </div>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="search-box-customers">
          <input
            type="text"
            placeholder="Filter by Name, Email, Loyalty, Last Visit"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ================= CUSTOMER TABLE ================= */}
        <div className="customer-table">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Loyalty</th>
                <th>Last Visit</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((c) => {
                  const orderCount = getOrderCount(c.id);
                  const totalSpent = getTotalSpent(c.id);

                  return (
                    <tr key={c.id}>
                      <td>
                        <div className="name-cell">
                          <div className="name-circle">
                            {c.initials || c.name.charAt(0)}
                          </div>
                          {c.name}
                        </div>
                      </td>

                      <td>
                        {c.email}
                        <br />
                        {c.phone}
                      </td>

                      <td>{orderCount}</td>

                      <td style={{ color: "#00D1C1" }}>
                        ${totalSpent.toFixed(2)}
                      </td>

                      <td>
                        <span className={`loyalty-badge ${c.loyalty?.toLowerCase()}`}>
                          {c.loyalty}
                        </span>
                      </td>

                      <td>{c.lastVisit}</td>

                      <td>
                        <i className="bi bi-eye action-eye"></i>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                    No customers found
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

export default Customers;
