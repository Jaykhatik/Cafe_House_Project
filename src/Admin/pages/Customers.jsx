import { useEffect, useState } from "react";
import axios from "axios";
import "../pages/cssOfPages/Customers.css";

const Customers = () => {
  // ================= STATES =================
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // For modal
  const [modalOpen, setModalOpen] = useState(false);

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

  // ================= HELPER FUNCTIONS (FIXED) =================
  const getCustomerOrders = (customerId) =>
    orders.filter(
      (o) => o.customerId === customerId
    );


  const getOrderCount = (customerId) =>
    getCustomerOrders(customerId).length;

  const getTotalSpent = (customerId) =>
    getCustomerOrders(customerId).reduce(
      (sum, o) => sum + (o.totalAmount || 0)
      ,
      0
    );

  // ================= FILTER =================
  const filteredCustomers = customers.filter((c) =>
    `${c.name} ${c.email} ${c.loyalty} ${c.lastVisit}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ================= STATS =================
  const totalCustomers = customers.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const avgOrderValue =
    totalCustomers > 0 ? (totalRevenue / totalCustomers).toFixed(2) : 0;

  return (
    <div className="main-content">
      <div className="customer-section">

        {/* STATS */}
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

        {/* SEARCH */}
        <div className="search-box-customers">
          <input
            type="text"
            placeholder="Filter by Name, Email, Loyalty, Last Visit"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* TABLE */}
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
                        <i
                          className="bi bi-eye action-eye"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setSelectedCustomer({ ...c }); // clone customer for editing
                            setModalOpen(true);
                          }}
                        ></i>

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
            {modalOpen && selectedCustomer && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3>Customer Details</h3>

                  <div className="customer-info">
                    <h4>Customer_Id :</h4>
                     <p>{selectedCustomer.id}</p>
                      <h4>Customer_Name :</h4>
                    <p>{selectedCustomer.name}</p>
                     <h4>Email :</h4>
                    <p>{selectedCustomer.email}</p>
                     <h4>Phone :</h4>
                    <p>{selectedCustomer.phone}</p>
                     <h4>Last Visit :</h4>
                    <p>{selectedCustomer.lastVisit}</p>
                     <h4>Address :</h4>
                    <p>{selectedCustomer.address}</p>
                    <p>
                      <strong>Loyalty:</strong>{" "}
                      <select
                        value={selectedCustomer.loyalty}
                        onChange={(e) =>
                          setSelectedCustomer({ ...selectedCustomer, loyalty: e.target.value })
                        }
                      >
                        <option value="Bronze">Bronze</option>
                        <option value="Silver">Silver</option>
                        <option value="Gold">Gold</option>
                      </select>
                    </p>
                  </div>

                  <div className="modal-actions" style={{ marginTop: "20px", textAlign: "right" }}>
                    <button
                      onClick={async () => {
                        try {
                          await axios.patch(
                            `http://localhost:3002/customers/${selectedCustomer.id}`,
                            { loyalty: selectedCustomer.loyalty }
                          );
                          fetchCustomers(); // refresh the table
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

          </table>

        </div>

      </div>
    </div>
  );
};

export default Customers;
