import { Navigate, Outlet } from "react-router-dom";

function AuthProtectedRoute() {
  const token = localStorage.getItem("token");
  console.log('x11');
  
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default AuthProtectedRoute;