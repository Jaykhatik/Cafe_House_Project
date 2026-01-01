import { useEffect, useState } from "react";
import axios from "axios";
import "../pages/cssOfPages/Categories.css";

function Categories() {

  // ===================== STATE =====================
  // This state will store category data from API
  const [categories, setCategories] = useState([]);

  // ===================== FETCH DATA FUNCTION =====================
  // Same simple function style you learned
  const fetch_data = async () => {
    try {
      const response = await axios.get("http://localhost:3001/categories");
      setCategories(response.data); // store API data into state
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // ===================== USE EFFECT =====================
  // Runs once when page loads
  useEffect(() => {
    fetch_data();
  }, []);

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

                {/* ITEM COUNT */}
                <p>{cat.itemCount} items</p>

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
