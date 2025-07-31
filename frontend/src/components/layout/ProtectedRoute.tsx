import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

interface ProtectedRouteProps {
  component: React.ElementType;
  redirectPath: string;
}

const ProtectedRoute = ({
  component: Component,
  redirectPath,
}: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={redirectPath} />;
  } 

  return <Component />;
};

export default ProtectedRoute;
