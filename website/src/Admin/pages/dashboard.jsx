import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import "../pages/cssOfPages/Dashboard.css";

function Dashboard() {
    const salesChartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    // ===================== STATE =====================
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [reports, setReports] = useState(null);
    const [menuItems, setMenuItems] = useState([]);

    // ===================== FETCH DATA =====================
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [ordersRes, customersRes, inventoryRes, reportsRes, menuRes] =
                    await Promise.all([
                        axios.get("http://localhost:3001/orders"),
                        axios.get("http://localhost:3001/customers"),
                        axios.get("http://localhost:3001/inventory"),
                        axios.get("http://localhost:3001/reports"),
                        axios.get("http://localhost:3001/menuItems"),
                    ]);

                setOrders(ordersRes.data);
                setCustomers(customersRes.data);
                setInventory(inventoryRes.data);
                setReports(reportsRes.data.thisMonth);
                setMenuItems(menuRes.data);
            } catch (error) {
                console.error("Dashboard API Error:", error);
            }
        };

        fetchDashboardData();
    }, []);

    // ===================== CALCULATIONS =====================
    const totalSales = orders.reduce((sum, o) => sum + o.total, 0);

    const today = "2024-01-15";
    const todaysOrders = orders.filter(o =>
        o.date.startsWith(today)
    ).length;

    const pendingOrders = orders.filter(
        o => o.status === "pending"
    ).length;

    const totalCustomers = customers.length;

    const recentOrders = orders.slice(-3).reverse();

    const lowStockItems = inventory.filter(item => item.stock < 40);

    const popularItems = () => {
        const sales = {};

        orders.forEach(order => {
            order.items.forEach(item => {
                sales[item.menuItemId] =
                    (sales[item.menuItemId] || 0) + item.quantity;
            });
        });

        return Object.entries(sales)
            .map(([id, count]) => {
                const menu = menuItems.find(m => m.id == id);
                return {
                    name: menu?.name || "Item",
                    orders: count,
                    width: `${Math.min(count * 10, 100)}%`,
                };
            })
            .sort((a, b) => b.orders - a.orders)
            .slice(0, 5);
    };

    // ===================== CHART =====================
    useEffect(() => {
        if (!reports) return;

        const ctx = salesChartRef.current.getContext("2d");

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
            type: "line",
            data: {
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                datasets: [
                    {
                        label: "Sales",
                        data: reports.line,
                        borderWidth: 3,
                        borderColor: "#009688",
                        tension: 0.35,
                        fill: false,
                    },
                ],
            },
            options: {
                plugins: { legend: { display: false } },
                scales: {
                    y: { ticks: { color: "#333" } },
                    x: { ticks: { color: "#333" } },
                },
            },
        });

        return () => chartInstanceRef.current.destroy();
    }, [reports]);

    // ===================== JSX =====================
    return (
        <div className="main-content">
            <div className="p-4">

                {/* Dashboard Cards */}
                <div className="row g-4 mb-4">
                    <div className="col-lg-3 col-md-6">
                        <div className="stat-card-index">
                            <div className="stat-icon-index">
                                <i className="bi bi-currency-dollar"></i>
                            </div>
                            <h3>${totalSales}</h3>
                            <p>Total Sales</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="stat-card-index">
                            <div className="stat-icon-index">
                                <i className="bi bi-cart-check"></i>
                            </div>
                            <h3>{todaysOrders}</h3>
                            <p>Today's Orders</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="stat-card-index">
                            <div className="stat-icon-index">
                                <i className="bi bi-clock-history"></i>
                            </div>
                            <h3>{pendingOrders}</h3>
                            <p>Pending Orders</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="stat-card-index">
                            <div className="stat-icon-index">
                                <i className="bi bi-people"></i>
                            </div>
                            <h3>{totalCustomers}</h3>
                            <p>Total Customers</p>
                        </div>
                    </div>
                </div>

                {/* Sales & Popular Items */}
                <div className="row g-4 mb-4">
                    <div className="col-lg-8">
                        <div className="card-section">
                            <h5>Sales Overview</h5>
                            <canvas ref={salesChartRef}></canvas>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card-section">
                            <h5>Popular Items</h5>
                            {popularItems().map(item => (
                                <div className="pop-item" key={item.name}>
                                    <span>{item.name}</span>
                                    <span>{item.orders} orders</span>
                                    <div className="bar">
                                        <div style={{ width: item.width }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Orders + Low Stock */}
                <div className="row g-4">
                    <div className="col-lg-8">
                        <div className="card-section">
                            <h5>Recent Orders</h5>
                            {recentOrders.map(order => (
                                <div className="order-box" key={order.id}>
                                    <div className="order-id">#{order.id}</div>
                                    <div className="order-info">
                                        <h6>Customer #{order.customerId}</h6>
                                        <small>{order.items.length} items</small>
                                    </div>
                                    <span className={`status ${order.status}`}>
                                        {order.status}
                                    </span>
                                    <span className="amount">${order.total}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card-section">
                            <h5>
                                <i className="bi bi-exclamation-triangle-fill me-2 custom-icon-lowstock"></i>
                                Low Stock Alerts
                            </h5>
                            {lowStockItems.map(item => (
                                <div className="stock-box" key={item.id}>
                                    <div>
                                        <h6>{item.item}</h6>
                                        <small>{item.stock} {item.unit} remaining</small>
                                    </div>
                                    <button className="restock-btn">Restock</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
