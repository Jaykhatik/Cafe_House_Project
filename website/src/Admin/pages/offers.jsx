import React, { useEffect, useState } from "react";
import axios from "axios";
import '../pages/cssOfPages/Offers.css';

function Offers() {
  const [offers, setOffers] = useState([]);       // Holds API data
  const [search, setSearch] = useState("");       // For search filter

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/offers"); // Replace with your API URL
        setOffers(response.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  // Filter offers based on search input
  const filteredOffers = offers.filter(offer =>
    `${offer.code} ${offer.discount} ${offer.minOrder} ${offer.status} ${offer.validFrom} ${offer.validTo}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="main-content">
      <div className="offers-section m-4">

        {/* HEADER (Search + Button) */}
        <div className="offers-header">

          {/* Search Box */}
          <div className="offers-search-box d-flex align-items-center">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search offers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Create Offer Button */}
          <button className="btn btn-teal-offers d-flex align-items-center gap-2">
            <i className="bi bi-plus"></i>
            <span>Create Offer</span>
          </button>

        </div>

        {/* TABLE */}
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
                  filteredOffers.map((offer, index) => (
                    <tr key={index}>
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
                      <td>
                        {offer.validFrom} → {offer.validTo}
                      </td>
                      <td>
                        <span className={`status-badge-offers ${offer.status}`}>
                          {offer.status}
                        </span>
                      </td>
                      <td className="text-center action-icons-offers">
                        <i className="bi bi-pencil-square"></i>
                        <i className="bi bi-trash"></i>
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

      </div>
    </div>
  );
}

export default Offers;
