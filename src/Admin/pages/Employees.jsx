import React, { useEffect, useState } from "react";
import axios from "axios";
import "../pages/cssOfPages/Employee.css";

function EmployeePage() {
// For Add/Edit Employee
const [showEmployeeModal, setShowEmployeeModal] = useState(false);
const [editingEmployee, setEditingEmployee] = useState(null);

// For Delete Employee
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleteEmployee, setDeleteEmployee] = useState(null);

// Form state
const [empForm, setEmpForm] = useState({
  name: "",
  initials: "",
  role: "",
  email: "",
  phone: "",
  shift: "Morning",
  status: "active",
});

  // ================= SEARCH STATE =================
  const [search, setSearch] = useState("");

  // ================= EMPLOYEE DATA STATE =================
  // This will store employees coming from API
  const [employees, setEmployees] = useState([]);

  // ================= FETCH DATA FUNCTION =================
  // Same simple function style as your other pages
  const fetch_data = async () => {
    try {
      const response = await axios.get("http://localhost:3002/employees");
      setEmployees(response.data); // store API data
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  //add employee
  const handleAddClick = () => {
  setEditingEmployee(null);       // Clear any editing state
  setEmpForm({
    name: "",
    initials: "",
    role: "",
    email: "",
    phone: "",
    shift: "Morning",
    status: "active",
  });
  setShowEmployeeModal(true);      // Show modal
};
const handleEditClick = (emp) => {
  setEditingEmployee(emp);
  setEmpForm({
    name: emp.name,
    initials: emp.initials,
    role: emp.role,
    email: emp.email,
    phone: emp.phone,
    shift: emp.shift,
    status: emp.status,
  });
  setShowEmployeeModal(true);
};
const handleDeleteClick = (emp) => {
  setDeleteEmployee(emp);
  setShowDeleteModal(true);
};
const handleFormChange = (e) => {
  const { name, value } = e.target;
  setEmpForm(prev => ({ ...prev, [name]: value }));
};
const handleSaveEmployee = async () => {
  try {
    if (editingEmployee) {
      // EDIT
      const res = await axios.put(
        `http://localhost:3002/employees/${editingEmployee.id}`,
        empForm
      );
      setEmployees(prev =>
        prev.map(emp => (emp.id === editingEmployee.id ? res.data : emp))
      );
    } else {
      // ADD
      const res = await axios.post(
        `http://localhost:3002/employees`,
        empForm
      );
      setEmployees(prev => [...prev, res.data]);
    }

    setShowEmployeeModal(false);
    setEditingEmployee(null);
  } catch (err) {
    console.error("Save failed:", err);
  }
};
const handleConfirmDelete = async () => {
  try {
    await axios.delete(`http://localhost:3002/employees/${deleteEmployee.id}`);
    setEmployees(prev => prev.filter(emp => emp.id !== deleteEmployee.id));
    setShowDeleteModal(false);
    setDeleteEmployee(null);
  } catch (err) {
    console.error("Delete failed:", err);
  }
};


  // ================= USE EFFECT =================
  // Runs once when page loads
  useEffect(() => {
    fetch_data();
  }, []);

  // ================= FILTER LOGIC =================
  // Filter employees based on search input
  const filteredEmployees = employees.filter((emp) =>
    `${emp.name} ${emp.role} ${emp.shift}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="main-content">
      <div className="employees-container px-4">

        {/* ================= SEARCH + ADD BUTTON ================= */}
        <div className="employee-top-bar">
          <div className="employee-search">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
  className="add-employee-btn d-flex align-items-center"
  onClick={handleAddClick}
>
  <i className="bi bi-plus-lg me-2"></i>
  Add Employee
</button>
        </div>

        {/* ================= EMPLOYEE CARDS ================= */}
        <div className="row g-4">
          {filteredEmployees.map((emp) => (
            <div className="col-lg-4 col-md-6" key={emp.id}>
              <div className="card-box">

                {/* Avatar + Status */}
                <div className="emp-header">
                  <div className="avatar-circle">{emp.initials}</div>
                  <span className={`emp-status ${emp.status}`}>
                    {emp.status === "active" ? "Active" : "On Leave"}
                  </span>
                </div>

                {/* Name & Role */}
                <h5 className="emp-name">{emp.name}</h5>
                <span className="emp-role">{emp.role}</span>

                {/* Info */}
                <div className="emp-info">
                  <p>
                    <i className="bi bi-envelope"></i> {emp.email}
                  </p>
                  <p>
                    <i className="bi bi-telephone"></i> {emp.phone}
                  </p>
                </div>

                {/* Footer */}
                <div className="emp-footer">
                  <p>
                    Shift: <b>{emp.shift}</b>
                  </p>
                  <div className="emp-footer-icons">
                   <i
  className="bi bi-pencil-square edit-icon"
  onClick={() => handleEditClick(emp)}
></i>
                   <i
  className="bi bi-trash delete-icon"
  onClick={() => handleDeleteClick(emp)}
></i>
                  </div>
                </div>

              </div>
            </div>
          ))}

          {/* NO DATA MESSAGE */}
          {filteredEmployees.length === 0 && (
            <p className="text-center text-muted w-100 mt-4">
              No employees found
            </p>
          )}
        </div>

      </div>
      {showEmployeeModal && (
  <div className="modal-overlay">
    <div className="modal-card">
      <h3>{editingEmployee ? "Edit Employee" : "Add Employee"}</h3>

      <div className="modal-body">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={empForm.name}
          onChange={handleFormChange}
        />
        <input
          type="text"
          name="initials"
          placeholder="Initials"
          value={empForm.initials}
          onChange={handleFormChange}
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={empForm.role}
          onChange={handleFormChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={empForm.email}
          onChange={handleFormChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={empForm.phone}
          onChange={handleFormChange}
        />
        <select
          name="shift"
          value={empForm.shift}
          onChange={handleFormChange}
        >
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
          <option value="Night">Night</option>
        </select>
        <select
          name="status"
          value={empForm.status}
          onChange={handleFormChange}
        >
          <option value="active">Active</option>
          <option value="on-leave">On Leave</option>
        </select>
      </div>

      <div className="modal-actions">
        <button onClick={() => setShowEmployeeModal(false)}>Cancel</button>
        <button
          style={{ background: "#198754", color: "#fff" }}
          onClick={handleSaveEmployee}
        >
          {editingEmployee ? "Save Changes" : "Add Employee"}
        </button>
      </div>
    </div>
  </div>
)}
{showDeleteModal && deleteEmployee && (
  <div className="modal-overlay">
    <div className="modal-card">
      <h3>Delete Employee</h3>
      <p>
        Are you sure you want to delete <strong>{deleteEmployee.name}</strong>?
      </p>

      <div className="modal-actions">
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

export default EmployeePage;
