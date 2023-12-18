import React, { useEffect } from "react";
import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

// import Login from "../pages/admin/login/Login";
// import ProtectedAdminRoute from "./ProtectedAdminRoute";
import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";

function AdminRoute() {
//   const { admin, refresh } = useSelector((state) => state);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async function () {
       
//         let { data } = await axios.get("/admin/check");

//       console.log(data,'ppppppppppppppp');
//       dispatch({
//         type: "admin",
//         payload: { login: data?.loggedIn, details: data?.admin },
//       });
//     })();
//   }, [refresh]);
  
  return (
    <Routes>
      {/* {admin.login === false && <Route path="/login" element={<Login />} />} */}
      {/* {admin.login === false && <Route path="/" element={<Login />} />} */}
      {/* {admin.login && <Route path="/login" element={<Navigate to="/admin/" />} />} */}
  
      {/* <Route element={<ProtectedAdminRoute admin={admin} />}> */}
        
          <Route path="/" element={<AdminDashboard/>} />
          
      {/* </Route> */}
      
    </Routes> 
  );
}
export default AdminRoute;     