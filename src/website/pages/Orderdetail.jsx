import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../pages/cssOfWebsite/orderDetail.css";

function OrderDetail() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        // Fetch menu items
        axios.get("http://localhost:3002/menuItems").then((res) => setMenuItems(res.data));

        // Fetch orders
        axios
            .get("http://localhost:3002/orders")
            .then((res) => {
                const foundOrder = res.data.find((o) => o.id === orderId);
                if (!foundOrder) {
                    alert("Order not found");
                    navigate(-1);
                    return;
                }
                setOrder(foundOrder);
            })
            .catch(() => {
                alert("Error fetching order");
                navigate(-1);
            });
    }, [orderId, navigate]);

    if (!order || menuItems.length === 0)
        return <h2 style={{ textAlign: "center" }}>Loading order details...</h2>;

    return (
        <div className="order-detail-page">
            <div className="order-detail-card">
                <h2 className="order-title">Order Details</h2>

                {/* ===== INFO ROW ===== */}
                <div className="info-row">
                    {/* Personal Info */}
                    <div className="info-card">
                        <h3>Personal Info</h3>
                        <p><strong>Customer ID :</strong> {order.customerId}</p>
                        <p><strong>Name :</strong> {order.customer.name}</p>
                        <p><strong>Email :</strong> {order.customer.email}</p>
                        <p><strong>Phone :</strong> {order.customer.phone}</p>
                    </div>

                    {/* Shipping Info */}
                    <div className="info-card">
                        <h3>Shipping Info</h3>
                        <p>{order.shippingAddress.address}</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                        <p>{order.shippingAddress.zip}, {order.shippingAddress.country}</p>
                    </div>
                </div>

                {/* ===== Order Summary Card ===== */}
                <div className="info-card">
                    <h3>Order Summary</h3>
                    <p><strong>Order ID :</strong> {order.id}</p>
                    <p><strong>Total Amount :</strong> ₹{order.totalAmount}</p>
                    <p>
                        <strong>Status :</strong>{" "}
                        <span className={`status-orderdetailpage ${order.status}`}>
                            {order.status}
                        </span>
                    </p>
                    <p><strong>Payment Method :</strong> {order.payment.method}</p>
                    <p><strong>Date :</strong> {order.date}</p>
                </div>

                {/* ===== Items Ordered ===== */}
                <div className="info-card">
                    <h3 className="items-title">Items Ordered</h3>
                    <div className="order-items">
                        {order.items.map((item, idx) => {
                            const menuItem = menuItems.find((m) => m.id === item.menuItemId);
                            return (
                                <div key={idx} className="order-item-card">
                                    <img
                                        src={menuItem ? menuItem.image : "/img/default-item.png"}
                                        alt={item.name}
                                        className="order-item-image"
                                    />
                                    <div className="order-item-info">
                                        <h4>{item.name}</h4>
                                        {/* {menuItem?.description && <p>{menuItem.description}</p>} */}
                                        <p>Price: ₹{item.price}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p><strong>Total: ₹{item.price * item.quantity}</strong></p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <button className="close-btn" onClick={() => navigate(-1)}>Close</button>
            </div>
        </div>
    );
}

export default OrderDetail;
