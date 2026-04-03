import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">
            Estate<span className="text-blue-500">Hub</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Discover modern homes, apartments, and properties with a clean and
            seamless experience. Built to help buyers find their perfect place.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-medium mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white transition cursor-pointer">Home</li>
            <li className="hover:text-white transition cursor-pointer">
              Properties
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Saved Listings
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Contact
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-medium mb-4">Contact</h3>
          <p className="text-sm">Kathmandu, Nepal</p>
          <p className="text-sm">support@estatehub.com</p>
          <p className="text-sm mt-2">+977 98XXXXXXXX</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800 text-center py-5 text-sm">
        © {new Date().getFullYear()} EstateHub — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
