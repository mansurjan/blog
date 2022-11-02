import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

const ProtectedRoute: React.FC = () => {
  const userRefreshToken = useAppSelector((state) => state.auth.refreshToken);

  return userRefreshToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
