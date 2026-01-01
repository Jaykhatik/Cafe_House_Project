import React, { useEffect, useState } from "react";
import axios from "axios";
import "../pages/cssOfPages/Employee.css";

function EmployeePage() {

  // ================= SEARCH STATE =================
  const [search, setSearch] = useState("");

  // ================= EMPLOYEE DATA STATE =================
  // This will store employees coming from API
  const [employees, setEmployees] = useState([]);

  // ================= FETCH DATA FUNCTION =================
  // Same simple function style as your other pages
  const fetch_data = async () => {
    try {
      const response = await axios.get("http://localhost:3001/employees");
      setEmployees(response.data); // store API data
    } catch (error) {
      console.error("Error fetching employees:", error);
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

          <button className="add-employee-btn d-flex align-items-center">
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
                    <i className="bi bi-pencil-square edit-icon"></i>
                    <i className="bi bi-trash delete-icon"></i>
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
    </div>
  );
}

export default EmployeePage;
