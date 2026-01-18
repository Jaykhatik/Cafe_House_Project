import React, { useEffect, useState } from "react";
import axios from "axios";
import '../pages/cssOfPages/Offers.css';

function Offers() {
  const [offers, setOffers] = useState([]);       // Holds API data
  const [search, setSearch] = useState("");       // For search filter
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const emptyOffer = {
    code: "",
    discount: "",
    minOrder: "",
    maxUsage: "",
    used: 0,
    validFrom: "",
    validTo: "",
    status: "active",
  };

  const [offerForm, setOfferForm] = useState(emptyOffer);

  const handleChange = (e) => {
    setOfferForm({ ...offerForm, [e.target.name]: e.target.value });
  };

  // Fetch offers from API
  const fetchOffers = async () => {
    try {
      const res = await axios.get("http://localhost:3002/offers");
      setOffers(res.data);
    } catch (err) {
      console.error("Error fetching offers:", err);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // Filter offers based on search input
  const filteredOffers = offers.filter(offer =>
    `${offer.code} ${offer.discount} ${offer.minOrder} ${offer.status} ${offer.validFrom} ${offer.validTo}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // SAVE OFFER (Add or Edit)
  const handleSaveOffer = async () => {
    try {
      if (showEditModal && selectedOffer?.id) {
        // Edit offer
        await axios.patch(
          `http://localhost:3002/offers/${selectedOffer.id}`,
          offerForm
        );
      } else {
        // Add new offer with proper ID format
        await axios.post("http://localhost:3002/offers", {
          ...offerForm,
          id: `OFFER_${Date.now()}`,
          used: 0
        });
      }

      await fetchOffers();
      setShowAddModal(false);
      setShowEditModal(false);
    } catch (err) {
      console.error("Error saving offer:", err);
    }
  };

  // DELETE OFFER
  const handleDeleteOffer = async () => {
    try {
      if (!selectedOffer?.id) return;
      await axios.delete(`http://localhost:3002/offers/${selectedOffer.id}`);
      await fetchOffers();
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Error deleting offer:", err);
    }
  };

  return (
    <div className="main-content">
      <div className="offers-section m-4">

        {/* HEADER */}
        <div className="offers-header">
          <div className="offers-search-box d-flex align-items-center">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search offers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <button
            className="btn btn-teal-offers"
            onClick={() => {
              setOfferForm(emptyOffer);
              setShowAddModal(true);
            }}
          >
            <i className="bi bi-plus"></i> Create Offer
          </button>
        </div>

        {/* OFFERS TABLE */}
        <div className="offers-table-container mx-4 mt-4">
          <div className="table-responsive">
            <table className="offers-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Discount</th>
                  <th>Min Order</th>
                  <th>Usage</th>
                  <th>Valid Period</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOffers.length > 0 ? (
                  filteredOffers.map((offer) => (
                    <tr key={offer.id}>
                      <td>
                        <span className="icon-badge-offers">
                          <i className="bi bi-tag"></i>
                        </span>
                        <span className="offer-code">{offer.code}</span>
                      </td>
                      <td>{offer.discount}</td>
                      <td>{offer.minOrder}</td>
                      <td>
                        <strong>{offer.used}</strong> / {offer.maxUsage}
                      </td>
                      <td>{offer.validFrom} → {offer.validTo}</td>
                      <td>
                        <span className={`status-badge-offers ${offer.status}`}>
                          {offer.status}
                        </span>
                      </td>
                      <td className="text-center action-icons-offers">
                        <i
                          className="bi bi-pencil-square"
                          onClick={() => {
                            setSelectedOffer(offer);
                            setOfferForm(offer);
                            setShowEditModal(true);
                          }}
                        ></i>
                        <i
                          className="bi bi-trash"
                          onClick={() => {
                            setSelectedOffer(offer);
                            setShowDeleteModal(true);
                          }}
                        ></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                      No offers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ADD / EDIT MODAL */}
        {(showAddModal || showEditModal) && (
          <div className="modal-overlay-offerpage">
            <div className="modal-card-offerpage scrollable-offerpage">
              <h3>{showEditModal ? "Edit Offer" : "Create Offer"}</h3>

              <label>Offer Code :</label>
              <input name="code" value={offerForm.code} onChange={handleChange} />

              <label>Discount :</label>
              <input name="discount" value={offerForm.discount} onChange={handleChange} />

              <label>Minimum Order :</label>
              <input name="minOrder" value={offerForm.minOrder} onChange={handleChange} />

              <label>Max Usage :</label>
              <input name="maxUsage" value={offerForm.maxUsage} onChange={handleChange} />

              <label>Valid From :</label>
              <input type="date" name="validFrom" value={offerForm.validFrom} onChange={handleChange} />

              <label>Valid To :</label>
              <input type="date" name="validTo" value={offerForm.validTo} onChange={handleChange} />

              <label>Status :</label>
              <select name="status" value={offerForm.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>

              <div className="modal-actions-offerpage">
                <button onClick={() => { setShowAddModal(false); setShowEditModal(false); }}>Cancel</button>
                <button onClick={handleSaveOffer}>
                  {showEditModal ? "Update Offer" : "Create Offer"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DELETE MODAL */}
        {showDeleteModal && selectedOffer && (
          <div className="modal-overlay-offerpage">
            <div className="modal-card-offerpage">
              <h3>Delete Offer</h3>
              <p>Are you sure you want to delete <strong>{selectedOffer.code}</strong>?</p>
              <div className="modal-actions-offerpage">
                <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button
                  style={{ background: "#dc3545", color: "#fff" }}
                  onClick={handleDeleteOffer}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Offers;
