import { useState } from "react";
import "../cssOfPages/Settins.css";
import CafeDetails from "./Cafedetail";
import AdminProfile from "./Adminprofile";
import Notifications from "./Notifications";
import Payment from "./Payment";

function Settings() {
  const [activeTab, setActiveTab] = useState("cafe");

  return (
    <div className="main-content-setting">
      <div className="container-fluid px-4 mt-4">

        {/* TABS */}
        <div className="settings-tabs">
          <button
            className={activeTab === "cafe" ? "tab active" : "tab"}
            onClick={() => setActiveTab("cafe")}
          >
            ☕ Cafe Details
          </button>

          <button
            className={activeTab === "admin" ? "tab active" : "tab"}
            onClick={() => setActiveTab("admin")}
          >
            👤 Admin Profile
          </button>

          <button
            className={activeTab === "notify" ? "tab active" : "tab"}
            onClick={() => setActiveTab("notify")}
          >
            🔔 Notifications
          </button>

          <button
            className={activeTab === "payment" ? "tab active" : "tab"}
            onClick={() => setActiveTab("payment")}
          >
            💳 Payment
          </button>
        </div>

        {/* TAB CONTENT */}
        <div className="settings-content">
          {activeTab === "cafe" && <CafeDetails/> }
          {activeTab === "admin" && <AdminProfile/>}
          {activeTab === "notify" && <Notifications/>}
          {activeTab === "payment" && <Payment/> }
        </div>

      </div>
    </div>
  );
}

export default Settings;
