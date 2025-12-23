import { Outlet } from "react-router-dom";
import Sidebar from "../Admin/components/Sidebar/Sidebar";
import TopNavbar from "../Admin/components/TopNav";



function AdminLayout(){
  return (
    <div className="d-flex">
      <Sidebar/>
      <div className="main-content" >
        <TopNavbar/>
        <Outlet/>
      </div>
    </div>
  );
};

export default AdminLayout;
