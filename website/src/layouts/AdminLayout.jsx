
import { Outlet } from "react-router-dom";
import Sidebar from "../Admin/components/Sidebar/Sidebar";
import Topbar from "../Admin/components/Topbar/Topbar";

const AdminLayout = () => {
  return (
    <>
      <Sidebar/>
      <Topbar title="Dashboard" />
      <main style={{ marginLeft: "250px", padding: "20px" }}>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
