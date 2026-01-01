import { useEffect, useState } from "react";
import axios from "axios";
import '../pages/cssOfPages/Reservation.css';

function Reservations() {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [calendarDates, setCalendarDates] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [search, setSearch] = useState("");

  // Generate calendar whenever month/year changes
  useEffect(() => {
    generateCalendar(currentMonth, currentYear);
  }, [currentMonth, currentYear]);

  const generateCalendar = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dates = [];
    let week = Array(firstDay).fill(null);

    for (let d = 1; d <= daysInMonth; d++) {
      week.push(d);
      if (week.length === 7) {
        dates.push(week);
        week = [];
      }
    }

    if (week.length) dates.push(week);
    setCalendarDates(dates);
  };

  // Fetch reservations from API on mount
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://localhost:3001/reservations"); // replace with your API URL
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  // Filter reservations based on search input
  const filteredReservations = reservations.filter(r =>
    `${r.name} ${r.phone} ${r.date} ${r.time} ${r.guests} ${r.table} ${r.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="main-content">
      <div className="reservation-page">

        {/* TOP CARDS */}
        <div className="row g-3 mb-4">
          {[ 
            { title: "Today's Reservations", value: reservations.length },
            { title: "Pending", value: reservations.filter(r => r.status === "pending").length, cls: "pending-res" },
            { title: "Confirmed", value: reservations.filter(r => r.status === "confirmed").length, cls: "confirmed-res" },
            { title: "Available Tables", value: 6, cls: "avail-res" } // This can also come from API
          ].map((item, i) => (
            <div className="col-lg-3 col-md-6" key={i}>
              <div className="res-card">
                <p className="res-card-title">{item.title}</p>
                <h2 className={item.cls}>{item.value}</h2>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">

          {/* CALENDAR */}
          <div className="col-lg-4">
            <div className="calendar-card">
              <h4 className="mb-3">Select Date</h4>
              <div className="calendar-header">
                <button
                  className="cal-nav"
                  onClick={() =>
                    currentMonth === 0
                      ? (setCurrentMonth(11), setCurrentYear(currentYear - 1))
                      : setCurrentMonth(currentMonth - 1)
                  }
                >
                  <i className="bi bi-chevron-left"></i>
                </button>

                <div>
                  <select
                    value={currentMonth}
                    onChange={(e) => setCurrentMonth(+e.target.value)}
                  >
                    {monthNames.map((m, i) => (
                      <option key={i} value={i}>{m}</option>
                    ))}
                  </select>

                  <select
                    value={currentYear}
                    onChange={(e) => setCurrentYear(+e.target.value)}
                  >
                    {Array.from({ length: 201 }, (_, i) => 1900 + i).map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <button
                  className="cal-nav"
                  onClick={() =>
                    currentMonth === 11
                      ? (setCurrentMonth(0), setCurrentYear(currentYear + 1))
                      : setCurrentMonth(currentMonth + 1)
                  }
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>

              <table className="calendar-table mt-2">
                <thead>
                  <tr className="calendar-weekdays">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                      <th key={d}>{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {calendarDates.map((week, i) => (
                    <tr key={i}>
                      {week.map((day, idx) => (
                        <td
                          key={idx}
                          className={
                            day === today.getDate() &&
                            currentMonth === today.getMonth() &&
                            currentYear === today.getFullYear()
                              ? "calendar-date active-date"
                              : "calendar-date"
                          }
                        >
                          {day}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* TABLE SECTION */}
          <div className="col-lg-8">

            {/* SEARCH + BUTTON */}
            <div className="search-box-reserv-header">
              <div className="search-box-reserv">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  placeholder="Search reservations..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              <button className="add-btn-reserv">
                <i className="bi bi-plus"></i> New Reservation
              </button>
            </div>

            {/* TABLE */}
            <div className="res-table-card table-responsive">
              <table className="align-middle custom-res-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Date & Time</th>
                    <th>Guests</th>
                    <th>Table</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredReservations.length > 0 ? (
                    filteredReservations.map((r, i) => (
                      <tr key={i}>
                        <td><strong>{r.name}</strong><br /><small>{r.phone}</small></td>
                        <td><i className="bi bi-calendar"></i> {r.date} <span className="time">{r.time}</span></td>
                        <td><i className="bi bi-people"></i> {r.guests}</td>
                        <td><span className="table-id">{r.table}</span></td>
                        <td><span className={`status-res ${r.status}`}>{r.status}</span></td>
                        <td><i className="bi bi-eye action-icon-reserv"></i></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                        No reservations found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Reservations;
