import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "../pages/cssOfPages/Reports.css";

function ReportsAnalytics() {
  const revenueChartRef = useRef(null);
  const categoryChartRef = useRef(null);
  const peakChartRef = useRef(null);

  const revenueChart = useRef(null);
  const categoryChart = useRef(null);
  const peakHoursChart = useRef(null);

  const [filter, setFilter] = useState("thisMonth");
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
  });

  /* =========================
     DATA SET
  ========================= */
  const reportData = {
    thisMonth: {
      revenue: 21000,
      orders: 320,
      customers: 124,
      line: [19000, 17000, 15500, 19000, 20500, 21000],
      category: [45, 20, 20, 15],
    },
    lastMonth: {
      revenue: 18200,
      orders: 280,
      customers: 98,
      line: [12000, 13000, 15000, 17000, 18000, 18200],
      category: [40, 25, 20, 15],
    },
    last3: {
      revenue: 48000,
      orders: 820,
      customers: 310,
      line: [14000, 18000, 16000, 20000, 22000, 21000],
      category: [42, 23, 18, 17],
    },
    thisYear: {
      revenue: 100800,
      orders: 1008,
      customers: 524,
      line: [12000, 14000, 18000, 15500, 21000, 19500],
      category: [38, 27, 20, 15],
    },
  };

  /* =========================
     INIT CHARTS
  ========================= */
  useEffect(() => {
    revenueChart.current = new Chart(revenueChartRef.current, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            data: reportData.thisMonth.line,
            borderColor: "#00e8d6",
            backgroundColor: "rgba(0,232,214,.2)",
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: chartOptions,
    });

    categoryChart.current = new Chart(categoryChartRef.current, {
      type: "doughnut",
      data: {
        labels: ["Hot Coffee", "Cold Coffee", "Tea", "Pastry"],
        datasets: [
          {
            data: reportData.thisMonth.category,
            backgroundColor: ["#00e8d6", "#4ddde3", "#0bbbc5", "#a47551"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutout: "70%",
        plugins: { legend: { labels: { color: "#b68c55" } } },
      },
    });

    peakHoursChart.current = new Chart(peakChartRef.current, {
      type: "bar",
      data: {
        labels: [
          "8AM", "9AM", "10AM", "11AM", "12PM",
          "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM"
        ],
        datasets: [
          {
            data: [45, 78, 92, 85, 120, 110, 75, 68, 82, 95, 88, 72],
            backgroundColor: "#00e8d6",
            borderRadius: 10,
          },
        ],
      },
      options: chartOptions,
    });

    updateDashboard("thisMonth");

    return () => {
      revenueChart.current.destroy();
      categoryChart.current.destroy();
      peakHoursChart.current.destroy();
    };
  }, []);

  /* =========================
     UPDATE DASHBOARD
  ========================= */
  const updateDashboard = (period) => {
    const data = reportData[period];

    setStats({
      revenue: data.revenue,
      orders: data.orders,
      customers: data.customers,
    });

    revenueChart.current.data.datasets[0].data = data.line;
    revenueChart.current.update();

    categoryChart.current.data.datasets[0].data = data.category;
    categoryChart.current.update();
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    updateDashboard(e.target.value);
  };

  return (
    <div className="main-content">
      <div className="container-fluid px-4 mt-5 report-dashboard">

        {/* FILTER */}
        <div className="d-flex justify-content-between mb-4">
          <select
            className="report-filter"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="last3">Last 3 Months</option>
            <option value="thisYear">This Year</option>
          </select>
        </div>

        {/* STATS */}
        <div className="row g-4 mb-4">
          <StatCard
            title="Total Revenue"
            value={stats.revenue}
            icon="bi-currency-rupee"
            variant="accent"
          />
          <StatCard
            title="Total Orders"
            value={stats.orders}
            icon="bi-bag-check"
            variant="green"
          />
          <StatCard
            title="New Customers"
            value={stats.customers}
            icon="bi-people"
            variant="gold"
          />
        </div>


        {/* CHARTS */}
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="chart-card">
              <h5>Revenue Overview</h5>
              <canvas ref={revenueChartRef}></canvas>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="chart-card">
              <h5>Sales by Category</h5>
              <canvas ref={categoryChartRef}></canvas>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="chart-card">
            <h5 className="mb-4">Peak Hours Analysis</h5>
            <canvas ref={peakChartRef}></canvas>
          </div>
        </div>

      </div>
    </div>
  );
}

/* =========================
   STAT CARD
========================= */
const StatCard = ({ title, value, icon, variant }) => (
  <div className="col-md-4">
    <div className="report-card">
      <div className={`report-icon ${variant}`}>
        <i className={`bi ${icon}`}></i>
      </div>

      <div>
        <p>{title}</p>
        <h3>{value.toLocaleString()}</h3>
      </div>
    </div>
  </div>
);


const chartOptions = {
  plugins: { legend: { display: false } },
  scales: {
    x: { ticks: { color: "#b68c55" } },
    y: { ticks: { color: "#b68c55" } },
  },
};

export default ReportsAnalytics;
