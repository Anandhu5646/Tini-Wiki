import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRoute from "./routes/UserRoute";
import { useSelector } from "react-redux";
import AdminRoute from "./routes/AdminRoute";



function App() {

  // axios.defaults.baseURL = "http://localhost:2000";
  axios.defaults.baseURL="https://tiniwiki.kkweb.online"
  axios.defaults.withCredentials = true;
  axios.defaults.headers={"Content-Type":"application/json"}
  
 
  return (
    
     <div className="App">

        <Routes>
          <Route path="/*" element={<UserRoute />} />
          <Route path="/admin/*" element={<AdminRoute/>}/>
        </Routes>
       
     </div>
     
      
  
  ) 
  }

export default App;

   