import { useState } from "react";
import "../cssOfPages/Settins.css";

function Payment() {
  const [methods, setMethods] = useState({
    cash: true,
    card: true,
    upi: true,
    netBanking: false,
    wallet: false,
  });

  const toggleMethod = (key) => {
    setMethods((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <div className="settings-card-payment">

        <h3 className="mb-2">Payment Settings</h3>
        <p className="sub-text-payment mb-4">
          Manage accepted payment methods for your cafe
        </p>

        {/* PAYMENT METHODS */}
        <h4 className="mb-3">Accepted Payment Methods</h4>

        <div className="payment-row">
          <span>💵 Cash</span>
          <label className="switch-cafedetail">
            <input
              type="checkbox"
              checked={methods.cash}
              onChange={() => toggleMethod("cash")}
            />
            <span className="slider-cafedetail"></span>
          </label>
        </div>

        <div className="payment-row">
          <span>💳 Card (Credit / Debit)</span>
          <label className="switch-cafedetail">
            <input
              type="checkbox"
              checked={methods.card}
              onChange={() => toggleMethod("card")}
            />
            <span className="slider-cafedetail"></span>
          </label>
        </div>

        <div className="payment-row">
          <span>📱 UPI</span>
          <label className="switch-cafedetail">
            <input
              type="checkbox"
              checked={methods.upi}
              onChange={() => toggleMethod("upi")}
            />
            <span className="slider-cafedetail"></span>
          </label>
        </div>

        <div className="payment-row">
          <span>🏦 Net Banking</span>
          <label className="switch-cafedetail">
            <input
              type="checkbox"
              checked={methods.netBanking}
              onChange={() => toggleMethod("netBanking")}
            />
            <span className="slider-cafedetail"></span>
          </label>
        </div>

        <div className="payment-row">
          <span>👛 Wallets (Paytm, PhonePe)</span>
          <label className="switch-cafedetail">
            <input
              type="checkbox"
              checked={methods.wallet}
              onChange={() => toggleMethod("wallet")}
            />
            <span className="slider-cafedetail"></span>
          </label>
        </div>

        <hr className="my-4" />

        {/* TAX & SERVICE */}
        <h4 className="mb-3">Charges & Tax</h4>

        <div className="row">
          <div className="col-md-6 form-group-payment">
            <label>GST (%)</label>
            <input type="number" defaultValue="5" />
          </div>

          <div className="col-md-6 form-group-payment">
            <label>Service Charge (%)</label>
            <input type="number" defaultValue="10" />
          </div>
        </div>
      </div>

      {/* SAVE BUTTON */}
      <div className="save-btn-wrapper-payment mt-4">
        <button className="save-btn-payment">
          Save Payment Settings
        </button>
      </div>
    </>
  );
}

export default Payment;
