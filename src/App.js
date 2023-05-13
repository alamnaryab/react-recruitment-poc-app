import "./App.css";
import "./index.css";
import Login from "./components/common/login/Login";
import Register from "./components/common/register/Register";
import Home from "./components/pages/home/Home";

import {  Routes, Route } from "react-router-dom";
import RequireAuth from "./components/common/requireAuth/RequireAuth";
import Profile from "./components/common/profile/Profile";
import RequestAccess from "./components/pages/requestAccess/RequestAccess";
import Candidates from "./components/pages/candidates/Candidates";

function App() {
  return (
    <div className="App">
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/home" element={<Home />} /> 

          <Route element={<RequireAuth  allowedRoles={['user','admin','super_admin']}   /> }>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<RequireAuth  allowedRoles={['admin','super_admin']}   /> }>            
            <Route path="/requestaccess" element={<RequestAccess />} />
            <Route path="/candidates" element={<Candidates />} />
          </Route>

          <Route element={<RequireAuth  allowedRoles={['super_admin']}   /> }>
            <Route path="/roles" element={<Register />} /> 
          </Route>
        </Routes>
    </div>
  );
}

export default App;
