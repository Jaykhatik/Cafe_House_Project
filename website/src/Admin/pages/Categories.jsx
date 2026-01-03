import { useEffect, useState } from "react";
import axios from "axios";
import "../pages/cssOfPages/Categories.css";

function Categories() {

  // ===================== STATE =====================
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  // ===================== FETCH CATEGORIES =====================
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3002/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // ===================== FETCH MENU ITEMS =====================
  const fetchMenuItems = async () => {
    try {
      const res = await axios.get("http://localhost:3002/menuItems");
      setMenuItems(res.data);
    } catch (err) {
      console.error("Error fetching menu items:", err);
    }
  };

  // ===================== USE EFFECT =====================
  useEffect(() => {
    fetchCategories();
    fetchMenuItems();
  }, []);

  // ===================== ITEM COUNT FUNCTION =====================
  const getItemCount = (categoryId) => {
    return menuItems.filter(item => item.categoryId === categoryId).length;
  };

  return (
    <div className="main-content">
      <div className="container-fluid category-container">

        {/* ================= HEADER ================= */}
        <div className="category-header">
          <h4>All Categories</h4>

          <button className="add-category-btn">
            <i className="bi bi-plus-lg"></i>
            Add Category
          </button>
        </div>

        {/* ================= CATEGORY CARDS ================= */}
        <div className="row g-4">

          {categories.map((cat) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={cat.id}>
              <div className="category-card">

                {/* ICON */}
                <div className={`cat-icon ${cat.color}`}>
                  <i className={`bi ${cat.icon}`}></i>
                </div>

                {/* CATEGORY NAME */}
                <h5>{cat.name}</h5>

                {/* ✅ DYNAMIC ITEM COUNT */}
                <p>{getItemCount(cat.id)} items</p>

                {/* ACTION ICONS */}
                <div className="cat-actions">
                  <i className="bi bi-pencil-square"></i>
                  <i className="bi bi-trash"></i>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Categories;
