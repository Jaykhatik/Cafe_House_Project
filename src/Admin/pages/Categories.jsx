import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "../pages/cssOfPages/Categories.css";

function Categories() {
  // ===================== STATE =====================
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  // Add/Edit Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");
  const [categoryColor, setCategoryColor] = useState("");

  // Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(null);

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

  // ===================== ITEM COUNT MAP =====================
  const itemCountMap = useMemo(() => {
    const map = {};
    menuItems.forEach((item) => {
      const key = String(item.categoryId);
      map[key] = (map[key] || 0) + 1;
    });
    return map;
  }, [menuItems]);

  const getItemCount = (categoryId) => {
    return itemCountMap[String(categoryId)] || 0;
  };


  // ===================== ADD / EDIT HANDLERS =====================
  const handleAddClick = () => {
    setEditingCategory(null);
    setCategoryName("");
    setCategoryIcon("");
    setCategoryColor("");
    setShowAddModal(true);
  };

  const handleEditClick = (cat) => {
    setEditingCategory(cat);
    setCategoryName(cat.name);
    setCategoryIcon(cat.icon);
    setCategoryColor(cat.color);
    setShowAddModal(true);
  };

  const handleSaveCategory = async () => {
    if (!categoryName || !categoryIcon || !categoryColor) {
      alert("Please fill all fields!");
      return;
    }

    const newCategory = {
      id: `CAT_${Date.now()}`,   // ✅ ADD THIS LINE
      name: categoryName,
      icon: categoryIcon,
      color: categoryColor,
    };

    try {
      if (editingCategory) {
        // EDIT
        await axios.put(
          `http://localhost:3002/categories/${editingCategory.id}`,
          newCategory
        );
      } else {
        // ADD
        await axios.post("http://localhost:3002/categories", newCategory);
      }

      setShowAddModal(false);
      setEditingCategory(null);
      fetchCategories(); // Refresh list
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };

  // ===================== DELETE HANDLERS =====================
  const handleDeleteClick = (cat) => {
    setDeleteCategory(cat);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // 1️⃣ Delete all menu items in that category
      const itemsToDelete = menuItems.filter(
        item => String(item.categoryId) === String(deleteCategory.id)
      );

      for (let item of itemsToDelete) {
        await axios.delete(`http://localhost:3002/menuItems/${item.id}`);
      }

      // 2️⃣ Delete the category
      await axios.delete(`http://localhost:3002/categories/${deleteCategory.id}`);

      // Update UI
      setCategories(prev => prev.filter(cat => cat.id !== deleteCategory.id));
      setMenuItems(prev =>
        prev.filter(item => String(item.categoryId) !== String(deleteCategory.id))
      );

      setShowDeleteModal(false);
      setDeleteCategory(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };


  return (
    <div className="main-content">
      <div className="container-fluid category-container">
        {/* ================= HEADER ================= */}
        <div className="category-header">
          <h4>All Categories</h4>
          <button className="add-category-btn" onClick={handleAddClick}>
            <i className="bi bi-plus-lg"></i> Add Category
          </button>
        </div>

        {/* ================= CATEGORY CARDS ================= */}
        <div className="row g-4">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={cat.id}>
                <div className="category-card">
                  {/* ICON */}
                  <div className={`cat-icon ${cat.color}`}>
                    <i className={`bi ${cat.icon}`}></i>
                  </div>

                  {/* CATEGORY NAME */}
                  <h5>{cat.name}</h5>

                  {/* ITEM COUNT */}
                  <p>{getItemCount(cat.id)} items</p>

                  {/* ACTION ICONS */}
                  <div className="cat-actions">
                    <i
                      className="bi bi-pencil-square"
                      onClick={() => handleEditClick(cat)}
                    ></i>
                    <i
                      className="bi bi-trash"
                      onClick={() => handleDeleteClick(cat)}
                    ></i>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-100">No categories found</p>
          )}
        </div>
      </div>

      {/* ================= ADD / EDIT MODAL ================= */}
      {showAddModal && (
        <div className="modal-overlay-categorypage">
          <div className="modal-card-categorypage">
            <h3>{editingCategory ? "Edit Category" : "Add Category"}</h3>
            <div className="admin-form-group-categorypage">
              <label>Category Name :</label>
              <input
                type="text"
                placeholder="Enter category name..."
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className="admin-form-group-categorypage">
              <label>Category Icon :</label>
              <input
                type="text"
                placeholder="e.g., bi-cup-hot-fill"
                value={categoryIcon}
                onChange={(e) => setCategoryIcon(e.target.value)}
              />
            </div>
            <div className="admin-form-group-categorypage">
              <label>Category_Color :</label>
              <input
                type="text"
                placeholder="Category Color (e.g., bg-coffee)"
                value={categoryColor}
                onChange={(e) => setCategoryColor(e.target.value)}
              />
            </div>
            <div className="modal-actions-categorypage">
              <button onClick={() => setShowAddModal(false)}>Cancel</button>
              <button
                style={{ background: "#198754", color: "#fff" }}
                onClick={handleSaveCategory}
              >
                {editingCategory ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {showDeleteModal && deleteCategory && (
        <div className="modal-overlay-categorypage">
          <div className="modal-card-categorypage">
            <h3>Delete Category</h3>
            <p>
              Are you sure you want to delete{" "}
              <strong>{deleteCategory.name}</strong>?
            </p>

            <div className="modal-actions-categorypage">
              <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button
                style={{ background: "#dc3545", color: "#fff" }}
                onClick={handleConfirmDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
