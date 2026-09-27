import { Navigate, Outlet } from "react-router-dom";

function AuthProtectedRoute() {
  const token = localStorage.getItem("token");
  // console.log(token ? 3:4);
  // console.log('x11');
  // console.log(token);
  
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default AuthProtectedRoute;