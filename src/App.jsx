// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Menu from "./components/menu";
import MemberList from "./components/MemberList";
import MenuList from "./components/MenuList";
import Register from "./components/Register";
import AddMenu from "./components/AddMenuItem";
import Bill from "./components/Bill";
import {CartProvider}  from "./components/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Orders from "./components/Orders";

export default function App() {
  return (
    <Router>
       <CartProvider>
          <Routes>
            {/* Temporary: Start with Login for testing */}
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/menu"element={<ProtectedRoute allowedRoles={["USER"]}> <Menu /> </ProtectedRoute>}/>           
            <Route path="/memberlist" element={<ProtectedRoute allowedRoles={["ADMIN"]}><MemberList/></ProtectedRoute>}/>
            <Route path="/menulist" element={<ProtectedRoute allowedRoles={["ADMIN"]}><MenuList/></ProtectedRoute>}/>
            <Route path="/admin"element={<ProtectedRoute allowedRoles={["ADMIN"]}><Admin /></ProtectedRoute>}/>      
            <Route path="/register" element={<ProtectedRoute allowedRoles={["ADMIN"]}><Register/></ProtectedRoute>}/>
            <Route path="/add-item" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AddMenu/></ProtectedRoute>}/>
            <Route path="/bill" element={<ProtectedRoute allowedRoles={["USER"]}><Bill /></ProtectedRoute>}/> 
            <Route path="/Orders" element={<ProtectedRoute allowedRoles={["USER"]}><Orders /></ProtectedRoute>}/> 

         </Routes>
       </CartProvider>
      
    </Router>
  );
}
