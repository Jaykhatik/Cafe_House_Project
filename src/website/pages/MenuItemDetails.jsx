import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, NavLink } from "react-router-dom";
import '../pages/cssOfWebsite/detail.css';
import { useCart } from "../../context/cartcontext";


function MenuItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { addToCart } = useCart();


  useEffect(() => {
    axios
      .get(`http://localhost:3002/menuItems/${id}`)
      .then(res => setItem(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!item) return <p className="text-center">Loading...</p>;

  return (
    <div className="tm-main-section detail-bg">
      <div className="container detail-container">

        {/* Breadcrumb */}
        <div className="detail-breadcrumb">
          <NavLink to="/">Home</NavLink> / <span>{item.name}</span>
        </div>

        <div className="detail-card">
          <div className="detail-image">
            <img src={item.image} alt={item.name} />
          </div>

          <div className="detail-info">
            <h1 className="detail-title">{item.name}</h1>

            <p className="detail-description">
  {item.description || "Delicious handcrafted item made fresh for you."}
</p>

            <div className="detail-meta">
  <span>⭐ {item.rating || "4.5"}</span>
  <span>{item.calories || "250 kcal"}</span>
</div>

            <p className="detail-ingredients">
              <b>Ingredients:</b> {item.ingredients}
            </p>

            <div className="detail-sizes">
              <b>Available Sizes</b>
              <div className="size-list">
                {Array.isArray(item.size) && item.size.map((s, i) => (
  <span key={i} className="size-badge">{s}</span>
))}

              </div>
            </div>

            <div className="detail-footer">
              <h2 className="price">${item.price}</h2>

              <button
                className="order-btn"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default MenuItemDetails;
