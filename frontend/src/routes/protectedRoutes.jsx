import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Protected = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return null; // or a spinner

  if (!currentUser) return <Navigate to="/login" replace />;

  return children;
};

export default Protected;
