import { useEffect, useState } from "react";
import axios from "axios";
import "../pages/cssOfPages/Inventory.css";

function Inventory() {

  // ================== STATE ==================
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filterItem, setFilterItem] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSupplier, setFilterSupplier] = useState("");

  // ================== FETCH INVENTORY ==================
  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:3002/inventory");
      setInventory(response.data);
    } catch (error) {
      console.error("Inventory fetch error:", error);
    }
  };

  // ================== USE EFFECT ==================
  useEffect(() => {
    fetchInventory();
  }, []);

  // ================== FILTER LOGIC ==================
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.item.toLowerCase().includes(search.toLowerCase());

    const matchesItem = filterItem === "" || item.item === filterItem;
    const matchesCategory = filterCategory === "" || item.category === filterCategory;
    const matchesSupplier = filterSupplier === "" || item.supplier === filterSupplier;

    const stock = item.stockPercentage;

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "full" && stock >= 60) ||
      (activeTab === "mid" && stock >= 30 && stock < 60) ||
      (activeTab === "low" && stock < 30);

    return (
      matchesSearch &&
      matchesItem &&
      matchesCategory &&
      matchesSupplier &&
      matchesTab
    );
  });

  return (
    <div className="main-content">
      <div className="inventory-section px-4 py-4">

        {/* ================= SUMMARY CARDS ================= */}
        <div className="row g-3 mb-5 inventory-upper">
          <div className="col-md-3">
            <div className="inv-card">
              <p className="inv-title">Total Items</p>
              <h2 className="inv-value">{inventory.length}</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="inv-card">
              <p className="inv-title">Low Stock</p>
              <h2 className="inv-value text-danger">
                {inventory.filter(i => i.stockPercentage < 30).length}
              </h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="inv-card">
              <p className="inv-title">Categories</p>
              <h2 className="inv-value">
                {[...new Set(inventory.map(i => i.category))].length}
              </h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="inv-card">
              <p className="inv-title">Suppliers</p>
              <h2 className="inv-value">
                {[...new Set(inventory.map(i => i.supplier))].length}
              </h2>
            </div>
          </div>
        </div>

        {/* ================= FILTERS ================= */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">

          <div className="d-flex gap-3 mb-3">
            <select className="inv-filter" onChange={(e) => setFilterItem(e.target.value)}>
              <option value="">All Items</option>
              {inventory.map((i, index) => (
                <option key={index} value={i.item}>{i.item}</option>
              ))}
            </select>

            <select className="inv-filter" onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="">All Categories</option>
              {[...new Set(inventory.map(i => i.category))].map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>

            <select className="inv-filter" onChange={(e) => setFilterSupplier(e.target.value)}>
              <option value="">All Suppliers</option>
              {[...new Set(inventory.map(i => i.supplier))].map((sup, i) => (
                <option key={i} value={sup}>{sup}</option>
              ))}
            </select>
          </div>

          <div className="inventory-serach-button d-flex">
            <div className="search-box inventory-search">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Search inventory..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button className="btn add-item-btn">
              <i className="bi bi-plus"></i> Add Item
            </button>
          </div>
        </div>

        {/* ================= TABS ================= */}
        <ul className="stock-tabs">
          {["all", "full", "mid", "low"].map(tab => (
            <li
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "all" ? "All" :
               tab === "full" ? "Full Stock" :
               tab === "mid" ? "Medium Stock" :
               "Low Stock"}
            </li>
          ))}
        </ul>

        {/* ================= TABLE ================= */}
        <div className="inventory-table">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Stock Level</th>
                <th>Supplier</th>
                <th>Last Restock</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="inv-item">
                      <div className="inv-icon"><i className="bi bi-box"></i></div>
                      {item.item}
                    </div>
                  </td>

                  <td><span className="inv-badge">{item.category}</span></td>

                  <td>
                    <div className={`stock-text ${item.stockPercentage < 30 ? "text-danger" : ""}`}>
                      {item.currentStock} / {item.maxStock}
                    </div>
                    <div className="stock-bar">
                      <div
                        className={`stock-fill ${item.stockPercentage < 30 ? "low" : ""}`}
                        style={{ width: `${item.stockPercentage}%` }}
                      ></div>
                    </div>
                    {item.stockPercentage < 30 && (
                      <span className="low-stock-text">⚠️ Low stock</span>
                    )}
                  </td>

                  <td>{item.supplier}</td>
                  <td>{item.lastRestock}</td>

                  <td>
                    <button className="restock-btn">Restock</button>
                    <i className="bi bi-pencil-square edit-icon"></i>
                  </td>
                </tr>
              ))}

              {filteredInventory.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No inventory items found
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

export default Inventory;
