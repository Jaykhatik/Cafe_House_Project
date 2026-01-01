import { useState } from "react";
import '../cssOfPages/Settins.css'

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

function CafeDetails() {
    const [hours, setHours] = useState(
        days.map((day) => ({
            day,
            from: "08:00 AM",
            to: "10:00 PM",
            open: true,
        }))
    );

    const updateTime = (index, field, value) => {
        const updated = [...hours];
        updated[index][field] = value;
        setHours(updated);
    };

    const toggleDay = (index) => {
        const updated = [...hours];
        updated[index].open = !updated[index].open;
        setHours(updated);
    };

    const handleSave = () => {
        console.log("Cafe Details Saved:", hours);
        alert("Cafe details saved!");
    };

    return (
        <>
            {/* ================= CAFE INFORMATION ================= */}
            <div className="settings-card-cafedetail">
                <h3>Cafe Information</h3>
                <p className="sub-text-cafedetail">Update your cafe's basic information</p>

                <label>Cafe Name</label>
                <input type="text" value="Cafe House" />

                <label>Address</label>
                <textarea rows="3">123 Coffee Street, Downtown</textarea>

                <div className="row mt-3">
                    <div className="col-md-6">
                        <label>Phone</label>
                        <input type="text" value="+1 234 567 890" />
                    </div>
                    <div className="col-md-6">
                        <label>Email</label>
                        <input type="email" value="contact@cafehouse.com" />
                    </div>
                </div>
            </div>

            {/* ================= OPENING HOURS ================= */}
            <div className="settings-card-cafedetail">
                <div className="opening-header-cafedetail">
                    <div className="d-flex align-items-start gap-3">
                        <span className="opening-icon-cafedetail">🕒</span>
                        <div>
                            <h3>Opening Hours</h3>
                            <p className="sub-text-cafedetail">Set your cafe's operating hours</p>
                        </div>
                    </div>
                </div>

                <div className="opening-hours-cafedetail">
                    {hours.map((item, index) => (
                        <div className="opening-row-cafedetail" key={item.day}>
                            <div className="day-name-cafedetail">{item.day}</div>

                            <div
                                className={`time-group-cafedetail ${!item.open ? "disabled" : ""
                                    }`}
                            >
                                <select
                                    value={item.from}
                                    disabled={!item.open}
                                    onChange={(e) =>
                                        updateTime(index, "from", e.target.value)
                                    }
                                >
                                    <option>08:00 AM</option>
                                    <option>09:00 AM</option>
                                    <option>10:00 AM</option>
                                </select>

                                <span className="to-text-cafedetail">to</span>

                                <select
                                    value={item.to}
                                    disabled={!item.open}
                                    onChange={(e) =>
                                        updateTime(index, "to", e.target.value)
                                    }
                                >
                                    <option>08:00 PM</option>
                                    <option>09:00 PM</option>
                                    <option>10:00 PM</option>
                                    <option>11:00 PM</option>
                                </select>
                            </div>

                            <label className="switch-cafedetail">
                                <input
                                    type="checkbox"
                                    checked={item.open}
                                    onChange={() => toggleDay(index)}
                                />
                                <span className="slider-cafedetail"></span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <button className="save-btn-cafedetail" onClick={handleSave}>
                    Save Changes
                </button>
            </div>
        </>
    );
}

export default CafeDetails;
