import { useEffect, useState } from "react";
import axios from "axios";
import "../pages/cssOfPages/Customers.css";

const Customers = () => {

    // ================= SEARCH STATE =================
    const [search, setSearch] = useState("");

    // ================= DATA STATE =================
    const [customers, setCustomers] = useState([]);

    // ================= FETCH DATA FUNCTION =================
    // This function calls API and stores data in state
    const fetch_data = async () => {
        try {
            const response = await axios.get("http://localhost:3001/customers");
            setCustomers(response.data); // store API data
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    // ================= USE EFFECT =================
    // Runs once when page loads
    useEffect(() => {
        fetch_data();
    }, []);

    // ================= FILTER LOGIC =================
    // Filters customers based on search input
    const filteredCustomers = customers.filter((c) =>
        `${c.name} ${c.email} ${c.loyalty} ${c.lastVisit}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // ================= CALCULATIONS FOR STATS =================
    const totalCustomers = customers.length;

    const totalRevenue = customers.reduce(
        (sum, c) => sum + (c.spent || 0),
        0
    );

    const avgOrderValue =
        totalCustomers > 0
            ? (totalRevenue / totalCustomers).toFixed(2)
            : 0;

    return (
        <div className="main-content">
            <div className="customer-section">

                {/* ================= STATS ================= */}
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

                {/* ================= TABLE ================= */}
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
                            {filteredCustomers.map((c) => (
                                <tr key={c.id}>
                                    <td>
                                        <div className="name-cell">
                                            <div className="name-circle">
                                                {c.initials}
                                            </div>
                                            {c.name}
                                        </div>
                                    </td>

                                    <td>
                                        {c.email}
                                        <br />
                                        {c.phone}
                                    </td>

                                    <td>{c.orders}</td>

                                    <td style={{ color: "#00D1C1" }}>
                                        ${c.spent}
                                    </td>

                                    <td>
                                        <span
                                            className={`loyalty-badge ${c.loyalty?.toLowerCase()}`}
                                        >
                                            {c.loyalty}
                                        </span>
                                        <br />
                                        {c.points} pts
                                    </td>

                                    <td>{c.lastVisit}</td>

                                    <td>
                                        <i className="bi bi-eye action-eye"></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default Customers;
