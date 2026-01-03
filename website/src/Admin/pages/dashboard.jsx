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
  const [menuItems, setMenuItems] = useState([]);

  // ===================== FETCH DATA =====================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, customersRes, inventoryRes, menuRes] =
          await Promise.all([
            axios.get("http://localhost:3002/orders"),
            axios.get("http://localhost:3002/customers"),
            axios.get("http://localhost:3002/inventory"),
            axios.get("http://localhost:3002/menuItems"),
          ]);

        setOrders(ordersRes.data);
        setCustomers(customersRes.data);
        setInventory(inventoryRes.data);
        setMenuItems(menuRes.data);
      } catch (error) {
        console.error("Dashboard API Error:", error);
      }
    };

    fetchData();
  }, []);

  // ===================== CARD VALUES =====================
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const newCustomers = customers.length;
  const pendingOrders = orders.filter(o => o.status === "pending").length;

  const recentOrders = [...orders].slice(-3).reverse();

  const lowStockItems = inventory.filter(
    item => item.stockPercentage < 40
  );

  // ===================== POPULAR ITEMS =====================
  const itemSales = {};
  orders.forEach(order => {
    order.items.forEach(i => {
      itemSales[i.menuItemId] =
        (itemSales[i.menuItemId] || 0) + i.quantity;
    });
  });

  const popularItems = Object.entries(itemSales)
    .map(([id, sold]) => {
      const item = menuItems.find(m => m.id === Number(id));
      return {
        item: item?.name || "Unknown",
        sold,
      };
    })
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);

  // ===================== SALES CHART =====================
  useEffect(() => {
    if (!orders.length) return;

    const dailySales = {};
    orders.forEach(order => {
      const date = order.date.split(" ")[0];
      dailySales[date] = (dailySales[date] || 0) + order.total;
    });

    const ctx = salesChartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: Object.keys(dailySales),
        datasets: [
          {
            label: "Sales",
            data: Object.values(dailySales),
            borderColor: "#009688",
            borderWidth: 3,
            tension: 0.35,
            fill: false,
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
      },
    });

    return () => chartInstanceRef.current.destroy();
  }, [orders]);

  // ===================== JSX =====================
  return (
    <div className="main-content">
      <div className="p-4">

        {/* DASHBOARD CARDS */}
        <div className="row g-4 mb-4">
          <div className="col-lg-3 col-md-6">
            <div className="stat-card-index">
              <div className="stat-icon-index">
                <i className="bi bi-currency-dollar"></i>
              </div>
              <h3>${totalSales.toFixed(2)}</h3>
              <p>Total Sales</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="stat-card-index">
              <div className="stat-icon-index">
                <i className="bi bi-cart-check"></i>
              </div>
              <h3>{totalOrders}</h3>
              <p>Total Orders</p>
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
              <h3>{newCustomers}</h3>
              <p>Customers</p>
            </div>
          </div>
        </div>

        {/* SALES & POPULAR ITEMS */}
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
              {popularItems.map((item, i) => (
                <div className="pop-item" key={i}>
                  <span>{item.item}</span>
                  <span>{item.sold} orders</span>
                  <div className="bar">
                    <div style={{ width: `${item.sold * 2}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RECENT ORDERS & LOW STOCK */}
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
                    <small>{item.stockPercentage}% remaining</small>
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
