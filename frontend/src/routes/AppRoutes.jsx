import { Routes, Route, BrowserRouter } from "react-router";
import Layout from "../components/Layout";
import Dashboard from "../components/Dashboard";
import Login from "../features/auth/Login";
import AuthCard from "../features/auth/components/AuthCard";
import Signup from "../features/auth/Signup";
import Properties from "../features/properties/Properties";
import Protected from "./protectedRoutes";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout route */}
        <Route path="/" element={<Layout />}>
          {/* Child route */}
          <Route index element={<Dashboard />} />
        </Route>
        <Route element={<AuthCard />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Route>
        <Route
          element={
            <Protected>
              <Layout />
            </Protected>
          }
        >
          <Route path="/property" element={<Properties />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
