import { createContext, useContext, useState, useEffect } from "react";
import { login, signup, logout, authMe } from "../features/auth/authServices";
import { toast } from "sonner";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState("");

  // Load logged in user

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const res = await authMe();
        if (res?.data) {
          setCurrentUser(res.data.data);
        }
      } catch (error) {
        if (currentUser !== null) {
          // only update if needed
          setCurrentUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // LOGIN
  const handleLogin = async (data) => {
    try {
      setLoading(true);
      setErrors("");

      const res = await login(data);

      if (res.data) {
        setCurrentUser(res?.data?.user);
        toast.success("Login successful 🎉");
        return true;
      }

      return false;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Login failed. Try again.";

      setErrors(message);
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // SIGNUP
  const handleSignup = async (data) => {
    try {
      setLoading(true);
      setErrors("");

      const res = await signup(data);

      if (res?.data) {
        setCurrentUser(res.data.data);
        toast.success("Account created successfully 🎉");
        return true;
      }

      return false;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Signup failed. Try again.";

      setErrors(message);
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const handleLogout = async () => {
    try {
      await logout();
      setCurrentUser(null);
      toast.success("Logged out successfully 👋");
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login: handleLogin,
        signup: handleSignup,
        logout: handleLogout,
        loading,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
