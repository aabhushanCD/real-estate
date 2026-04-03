import { useState } from "react";
import { X, Menu, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  return (
    <header className="w-full bg-white shadow-sm  sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-600">
          Estate<span className="text-slate-800">Hub</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-slate-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/property" className="hover:text-blue-600 transition">
            Properties
          </Link>
          <Link to="#" className="hover:text-blue-600 transition">
            Saved
          </Link>
          <Link to="#" className="hover:text-blue-600 transition">
            Contact
          </Link>
        </nav>

        {/* Right Actions */}
        {!currentUser ? (
          <div className="hidden md:flex items-center gap-4">
            <button
              className="text-slate-700 hover:text-blue-600"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="text-red-500" onClick={() => logout()}>
            <LogOut />
          </div>
        )}
        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-800"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <nav className="flex flex-col p-5 gap-4 text-slate-700">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link to="/property" className="hover:text-blue-600">
              Properties
            </Link>
            <Link to="#" className="hover:text-blue-600">
              Saved
            </Link>
            <Link to="#" className="hover:text-blue-600">
              Contact
            </Link>

            <button
              className="mt-2 text-left hover:text-blue-600"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="bg-blue-600 text-white py-2 rounded-lg mt-2"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
