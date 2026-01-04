import { useState, useRef } from "react";
import "../cssOfPages/Settins.css";

function AdminProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }

    setProfileImage(URL.createObjectURL(file));
  };

  return (
    <>
      <div className="settings-card-adminpf">

        {/* PROFILE IMAGE */}
        <div className="profile-header-adminpf">
          <div className="profile-left-adminpf">

            <div className="profile-avatar-adminpf">
              {profileImage ? (
                <img src={profileImage} alt="Admin" />
              ) : (
                "AD"
              )}
            </div>

            <button
              type="button"
              className="change-photo-btn-adminpf"
              onClick={() => fileInputRef.current.click()}
            >
              Change Photo
            </button>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* BASIC INFO */}
        <h3 className="mb-4">Admin Profile</h3>

        <div className="row mb-4">
          <div className="col-md-6 form-group-adminpf">
            <label>First Name</label>
            <input type="text" defaultValue="Admin" />
          </div>

          <div className="col-md-6 form-group-adminpf">
            <label>Last Name</label>
            <input type="text" defaultValue="User" />
          </div>
        </div>

        <div className="form-group-adminpf mb-4">
          <label>Email</label>
          <input type="email" defaultValue="admin@cafehouse.com" />
        </div>

        <div className="form-group-adminpf mb-4">
          <label>Phone</label>
          <input type="text" defaultValue="+1 234 567 890" />
        </div>

        <hr className="my-5" />

        {/* SECURITY */}
        <h4 className="mb-4">Security</h4>

        <div className="form-group-adminpf mb-4">
          <label>Current Password</label>
          <input type="password" />
        </div>

        <div className="row">
          <div className="col-md-6 form-group-adminpf">
            <label>New Password</label>
            <input type="password" />
          </div>

          <div className="col-md-6 form-group-adminpf">
            <label>Confirm Password</label>
            <input type="password" />
          </div>
        </div>
      </div>

      {/* SAVE BUTTON */}
      <div className="save-btn-wrapper-adminpf mt-4">
        <button className="save-btn-adminpf">
          Update Profile
        </button>
      </div>
    </>
  );
}

export default AdminProfile;
