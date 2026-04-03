import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
const Layout = () => {
  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-5 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
