import React from "react";
import { Link } from "react-router-dom";
import SoftflareIcon from "../assets/SoftFlareSolutions.png";

function Navbar({ mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <nav className="bg-[#f7f8f9] shadow-lg fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex gap-10">
            <div className="flex-shrink-0 flex flex-col justify-center h-16">
              <span className="text-xl font-semibold text-gray-800">
                RoomRental
              </span>
              <div className="flex items-center text-xs">
                by{" "}
                <img
                  src={SoftflareIcon}
                  className="h-6 ml-1"
                  alt="Softflare Solutions"
                />
              </div>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/rooms">Rooms</NavLink>
              <NavLink to="/bookings">Bookings</NavLink>
              <NavLink to="/finances">Finances</NavLink>
              <NavLink to="/staff">Staff</NavLink>
              <NavLink to="/maintenance">Maintenance</NavLink>
            </div>
          </div>

          <div className="sm:flex items-center hidden">
            <Link
              to="/"
              className="shadow-sm text-sm font-bold text-red-500 hover:text-red-700 bg-red-100 px-3 py-2 rounded-md border border-red-500"
            >
              Logout
            </Link>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <MobileMenu
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      )}
    </nav>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
    >
      {children}
    </Link>
  );
}

function MobileMenu({ mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <div className="sm:hidden">
      <div className="pt-2 pb-3 space-y-1">
        <MobileNavLink
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          to="/dashboard"
        >
          Dashboard
        </MobileNavLink>
        <MobileNavLink
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          to="/rooms"
        >
          Rooms
        </MobileNavLink>
        <MobileNavLink to="/bookings">Bookings</MobileNavLink>
        <MobileNavLink to="/finances">Finances</MobileNavLink>
        <MobileNavLink to="/staff">Staff</MobileNavLink>
        <MobileNavLink to="/maintenance">Maintenance</MobileNavLink>
        <Link
          to="/"
          className="block pl-3 pr-4 py-2 border-l-4 text-red-500 font-bold text-gray-500 hover:text-red-800 hover:bg-red-50 hover:border-red-300"
        >
          Logout
        </Link>
      </div>
    </div>
  );
}

function HamburgerIcon() {
  return (
    <svg
      className="block h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="block h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export default Navbar;
