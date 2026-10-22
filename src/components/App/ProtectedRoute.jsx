import { Navigate, useLocation, useParams } from "react-router-dom";

function ProtectedRoute({
  isLoggedIn,
  userRole,
  children,
  anonymous = false,
  allowedRoles = [],
  mustChangePassword,
}) {
  const location = useLocation();
  const { applicantId } = useParams();

  const dashboard =
    userRole === "customer"
      ? `/customer-dashboard/${applicantId}`
      : "/admin-dashboard";

  const from = location.state?.from?.pathname || dashboard;

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} replace />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (
    !anonymous &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(userRole)
  ) {
    return <Navigate to={dashboard} replace />;
  }

  if (
    userRole === "customer" &&
    mustChangePassword &&
    location.pathname.startsWith("/customer-dashboard")
  ) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
