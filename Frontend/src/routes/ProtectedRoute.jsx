import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      throw new Error("Invalid JWT");
    }

    const decoded = JSON.parse(atob(parts[1]));

    if (!decoded.exp || decoded.exp * 1000 <= Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("roles");

      return <Navigate to="/auth" replace />;
    }

    let roles = decoded.roles || [];

    if (typeof roles === "string") {
      roles = roles
        .replace("[", "")
        .replace("]", "")
        .split(",")
        .map((role) => role.trim());
    }

    const isAllowed = roles.some((role) =>
      allowedRoles.includes(role)
    );

    if (!isAllowed) {
      return <Navigate to="/" replace />;
    }

    return children ? children : <Outlet />;
  } catch (error) {
    console.error("TOKEN ERROR:", error);

    localStorage.removeItem("token");
    localStorage.removeItem("roles");

    return <Navigate to="/auth" replace />;
  }
};

export default ProtectedRoute;