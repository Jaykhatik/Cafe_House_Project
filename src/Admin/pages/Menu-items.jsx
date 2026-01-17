import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "../pages/cssOfPages/Menu-item.css";

const MenuItems = () => {
  const [searchValue, setSearchValue] = useState("");
  const [menuData, setMenuData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newItem, setNewItem] = useState({
    name: "",
    categoryId: "",
    ingredients: "",
    description: "",
    price: "",
    image: "",
    calories: "",
    rating: "",
    size: ["Small", "Medium", "Large"], // ✅ ADD THIS
    isSpecial: false,
    status: "active"
  });





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
  //edit click function
  const handleEditClick = (item) => {
    setEditItem({ ...item }); // copy item data
    setShowEditModal(true);   // open modal
  };
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = value;

    // convert number fields
    if (name === "price" || name === "rating" || name === "categoryId") {
      newValue = Number(value);
    }

    // checkbox
    if (type === "checkbox") {
      newValue = checked;
    }

    setEditItem(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleUpdateItem = async () => {
    try {
      await axios.put(
        `http://localhost:3002/menuItems/${editItem.id}`,
        editItem
      );

      // Update UI
      setMenuData(prev =>
        prev.map(item =>
          item.id === editItem.id ? editItem : item
        )
      );

      setShowEditModal(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  //delete
  const handleDeleteClick = (item) => {
    setDeleteItem(item);
    setShowDeleteModal(true);
  };
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3002/menuItems/${deleteItem.id}`
      );

      // remove from UI
      setMenuData(prev =>
        prev.filter(item => item.id !== deleteItem.id)
      );

      setShowDeleteModal(false);
      setDeleteItem(null);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };


  //add item
  const handleAddClick = () => {
    setNewItem({
      name: "",
      categoryId: "",
      ingredients: "",
      description: "",
      price: "",
      image: "",
      calories: "",
      rating: "",
      isSpecial: false
    });

    setShowAddModal(true);
  };
  const handleAddChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = value;

    if (name === "price" || name === "rating") {
      newValue = Number(value);
    }

    if (type === "checkbox") {
      newValue = checked;
    }

    setNewItem(prev => ({
      ...prev,
      [name]: newValue
    }));
  };
  const handleAddItem = async () => {
    try {
      const rawId = Date.now().toString();

      const payload = {
        ...newItem,
        id: `ITEM_${rawId}` // ✅ REQUIRED FORMAT
      };

      const res = await axios.post(
        "http://localhost:3002/menuItems",
        payload
      );

      // update UI instantly
      setMenuData(prev => [...prev, res.data]);

      setShowAddModal(false);
    } catch (error) {
      console.error("Add item failed", error);
    }
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

          <button
            className="add-item-btn d-flex align-items-center"
            onClick={handleAddClick}
          >

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
                    <td>${Number(item.price).toFixed(2)}</td>


                    <td>
                      <span className={`status-badge ${item.status || "active"}`}>
                        {item.status === "inactive" ? "Inactive" : "Active"}
                      </span>
                    </td>

                    <td>
                      <i
                        className="action edit"
                        onClick={() => handleEditClick(item)}
                      >
                        ✏️
                      </i>


                      <i
                        className="action delete"
                        onClick={() => handleDeleteClick(item)}
                      >
                        🗑
                      </i>

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
      {showEditModal && editItem && (
        <div className="modal-overlay">
          <div className="modal-card scrollable">

            <h3>Edit Menu Item</h3>

            <label>Name</label>
            <input
              type="text"
              name="name"
              value={editItem.name}
              onChange={handleEditChange}
            />

            <label>Ingredients</label>
            <input
              type="text"
              name="ingredients"
              value={editItem.ingredients}
              onChange={handleEditChange}
            />

            <label>Description</label>
            <textarea
              name="description"
              value={editItem.description}
              onChange={handleEditChange}
            />

            <label>Price</label>
            <input
              type="number"
              step="0.1"
              name="price"
              value={editItem.price}
              onChange={handleEditChange}
            />

            <label>Image URL</label>
            <input
              type="text"
              name="image"
              value={editItem.image}
              onChange={handleEditChange}
            />

            <label>Calories</label>
            <input
              type="text"
              name="calories"
              value={editItem.calories}
              onChange={handleEditChange}
            />

            <label>Rating</label>
            <input
              type="number"
              step="0.1"
              name="rating"
              value={editItem.rating}
              onChange={handleEditChange}
            />

            <label>Category</label>
            <select
              name="categoryId"
              value={editItem.categoryId}
              onChange={handleEditChange}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <label>Status</label>
            <select
              name="status"
              value={editItem.status}
              onChange={handleEditChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <label className="checkbox">
              <input
                type="checkbox"
                name="isSpecial"
                checked={editItem.isSpecial}
                onChange={handleEditChange}
              />
              Special Item
            </label>

            <div className="modal-actions">
              <button onClick={() => setShowEditModal(false)}>Cancel</button>
              <button onClick={handleUpdateItem}>Save Changes</button>
            </div>

          </div>
        </div>
      )}
      {showDeleteModal && deleteItem && (
        <div className="modal-overlay">
          <div className="modal-card">

            <h3>Delete Item</h3>

            <p>
              Are you sure you want to delete
              <strong> {deleteItem.name}</strong>?
            </p>

            <div className="modal-actions">
              <button onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>

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
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-card scrollable">

            <h3>Add Menu Item</h3>

            <label>Name</label>
            <input name="name" value={newItem.name} onChange={handleAddChange} />

            <label>Ingredients</label>
            <input name="ingredients" value={newItem.ingredients} onChange={handleAddChange} />

            <label>Description</label>
            <textarea name="description" value={newItem.description} onChange={handleAddChange} />

            <label>Price</label>
            <input type="number" name="price" value={newItem.price} onChange={handleAddChange} />

            <label>Image URL</label>
            <input name="image" value={newItem.image} onChange={handleAddChange} />

            <label>Calories</label>
            <input name="calories" value={newItem.calories} onChange={handleAddChange} />

            <label>Rating</label>
            <input type="number" step="0.1" name="rating" value={newItem.rating} onChange={handleAddChange} />

            <label>Category</label>
            <select name="categoryId" value={newItem.categoryId} onChange={handleAddChange}>
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <label>Status</label>
            <select
              name="status"
              value={newItem.status || "active"}
              onChange={handleAddChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <label className="checkbox">
              <input
                type="checkbox"
                name="isSpecial"
                checked={newItem.isSpecial}
                onChange={handleAddChange}
              />
              Special Item
            </label>

            <div className="modal-actions">
              <button onClick={() => setShowAddModal(false)}>Cancel</button>
              <button onClick={handleAddItem}>Add Item</button>
            </div>

          </div>
        </div>
      )}


    </div>
  );
};

export default MenuItems;
