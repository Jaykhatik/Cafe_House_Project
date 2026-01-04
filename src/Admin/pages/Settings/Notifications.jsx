import { useState } from "react";
import "../cssOfPages/Settins.css";

function Notifications() {
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    newCustomer: true,
    lowStock: false,
    paymentAlerts: true,
    promotions: false,
    emailAlerts: true,
    smsAlerts: false,
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <div className="settings-card-notifypage">

        <h3 className="mb-2">Notifications</h3>
        <p className="sub-text-notifypage mb-4">
          Manage how you receive notifications and alerts
        </p>

        {/* ORDER & SYSTEM */}
        <h4 className="mb-3">Order & System Alerts</h4>

        <div className="notify-row-notifypage">
          <span>Order Status Updates</span>
          <label className="switch-notifypage">
            <input
              type="checkbox"
              checked={notifications.orderUpdates}
              onChange={() => toggleNotification("orderUpdates")}
            />
            <span className="slider-notifypage"></span>
          </label>
        </div>

        <div className="notify-row-notifypage">
          <span>New Customer Registered</span>
          <label className="switch-notifypage">
            <input
              type="checkbox"
              checked={notifications.newCustomer}
              onChange={() => toggleNotification("newCustomer")}
            />
            <span className="slider-notifypage"></span>
          </label>
        </div>

        <div className="notify-row-notifypage">
          <span>Low Stock Alerts</span>
          <label className="switch-notifypage">
            <input
              type="checkbox"
              checked={notifications.lowStock}
              onChange={() => toggleNotification("lowStock")}
            />
            <span className="slider-notifypage"></span>
          </label>
        </div>

        <div className="notify-row-notifypage">
          <span>Payment Alerts</span>
          <label className="switch-notifypage">
            <input
              type="checkbox"
              checked={notifications.paymentAlerts}
              onChange={() => toggleNotification("paymentAlerts")}
            />
            <span className="slider-notifypage"></span>
          </label>
        </div>

        <hr className="my-4" />

        {/* MARKETING */}
        <h4 className="mb-3">Marketing Notifications</h4>

        <div className="notify-row-notifypage">
          <span>Promotions & Offers</span>
          <label className="switch-notifypage">
            <input
              type="checkbox"
              checked={notifications.promotions}
              onChange={() => toggleNotification("promotions")}
            />
            <span className="slider-notifypage"></span>
          </label>
        </div>

        <hr className="my-4" />

        {/* DELIVERY */}
        <h4 className="mb-3">Notification Channels</h4>

        <div className="notify-row-notifypage">
          <span>Email Notifications</span>
          <label className="switch-notifypage">
            <input
              type="checkbox"
              checked={notifications.emailAlerts}
              onChange={() => toggleNotification("emailAlerts")}
            />
            <span className="slider-notifypage"></span>
          </label>
        </div>

        <div className="notify-row-notifypage">
          <span>SMS Notifications</span>
          <label className="switch-notifypage">
            <input
              type="checkbox"
              checked={notifications.smsAlerts}
              onChange={() => toggleNotification("smsAlerts")}
            />
            <span className="slider-notifypage"></span>
          </label>
        </div>
      </div>

      {/* SAVE BUTTON */}
      <div className="save-btn-wrapper-notifypage mt-4">
        <button className="save-btn-notifypage">
          Save Notification Settings
        </button>
      </div>
    </>
  );
}

export default Notifications;
