import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "../pages/cssOfPages/Menu-item.css";

const MenuItems = () => {
  const [searchValue, setSearchValue] = useState("");
  const [menuData, setMenuData] = useState([]);
  const [categories, setCategories] = useState([]);

  // -------- FETCH MENU ITEMS --------
  useEffect(() => {
    axios.get("http://localhost:3002/menuItems")
      .then(res => setMenuData(res.data))
      .catch(err => console.error(err));
  }, []);

  // -------- FETCH CATEGORIES --------
  useEffect(() => {
    axios.get("http://localhost:3002/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  // -------- CREATE CATEGORY MAP FOR FAST LOOKUP --------
  const categoryMap = useMemo(() => {
    const map = {};
    categories.forEach(cat => {
      map[Number(cat.id)] = cat.name; // Ensure numeric keys
    });
    return map;
  }, [categories]);

  // -------- GET CATEGORY NAME --------
  const getCategoryName = (categoryId) => {
    return categoryMap[Number(categoryId)] || "Unknown";
  };

  // -------- SEARCH FILTER --------
  const filteredMenu = menuData.filter(item =>
    `${item.name} ${getCategoryName(item.categoryId)} ${item.ingredients} ${item.price} ${item.status}`
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );

  return (
    <div className="main-content">
      <div className="menu-section">

        {/* HEADER */}
        <div className="menu-header">
          <div className="search-box1">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search items, category, price..."
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
          </div>

          <button className="add-item-btn d-flex align-items-center">
            <i className="bi bi-plus-lg me-2"></i> Add Item
          </button>
        </div>

        {/* TABLE */}
        <div className="menu-table card-style">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Category</th>
                <th>Ingredients</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredMenu.length > 0 ? (
                filteredMenu.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>

                    <td className="item-name">
                      <div className="item-icon">
                        <img
                          src={item.image || "/img/default-coffee.jpg"}
                          alt={item.name}
                          className="menu-item-img"
                          onError={(e) => { e.target.onerror = null; e.target.src = "/img/default-coffee.jpg"; }}
                        />
                      </div>
                      {item.name}
                    </td>

                    {/* ✅ DYNAMIC CATEGORY */}
                    <td>
                      <span className="badge category">
                        {getCategoryName(item.categoryId)}
                      </span>
                    </td>

                    <td>{item.ingredients}</td>
                    <td>${item.price.toFixed(2)}</td>

                    <td>
                      <span
                        className={`badge ${
                          item.status === "available"
                            ? "available"
                            : item.status === "low-stock"
                              ? "low"
                              : "out"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <i className="action edit">✏️</i>
                      <i className="action delete">🗑</i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                    No items found
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

export default MenuItems;
