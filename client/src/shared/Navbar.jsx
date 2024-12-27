import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo/logo.jpeg";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = async () => {
    await logOut();
    navigate("/");
  };

  return (
    <div className="transition-colors duration-300 shadow-md bg-gradient-to-r from-blue-100 to-blue-200 text-gray-700">
      {/* Navbar Header */}
      <div className="flex justify-between items-center px-5 py-4 max-w-7xl mx-auto">
        {/* Logo + name */}
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} className="h-10 mr-2 rounded-full" alt="logo" />
          </Link>
          <span className="font-bold text-xl text-blue-800">openEdu</span>
        </div>

        {/* Large Screen Links */}
        <div className="hidden md:flex items-center justify-center space-x-5 flex-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-blue-600 ${
                isActive
                  ? "text-blue-700 font-semibold border-b-2 border-blue-700"
                  : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/available-donation"
            className={({ isActive }) =>
              `hover:text-blue-600 ${
                isActive
                  ? "text-blue-700 font-semibold border-b-2 border-blue-700"
                  : ""
              }`
            }
          >
            Available Donations
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/donate"
                className={({ isActive }) =>
                  `hover:text-blue-600 ${
                    isActive
                      ? "text-blue-700 font-semibold border-b-2 border-blue-700"
                      : ""
                  }`
                }
              >
                Donate
              </NavLink>
              <NavLink
                to="/my-donations"
                className={({ isActive }) =>
                  `hover:text-blue-600 ${
                    isActive
                      ? "text-blue-700 font-semibold border-b-2 border-blue-700"
                      : ""
                  }`
                }
              >
                My Donations
              </NavLink>
              <NavLink
                to="/received-donations"
                className={({ isActive }) =>
                  `hover:text-blue-600 ${
                    isActive
                      ? "text-blue-700 font-semibold border-b-2 border-blue-700"
                      : ""
                  }`
                }
              >
                Received Donations
              </NavLink>
            </>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              {/* User Avatar */}
              <div className="relative group">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-gray-500 cursor-pointer" />
                )}
                <div className="absolute left-0 mt-2 hidden group-hover:block bg-blue-100 text-blue-700 py-1 px-2 rounded-lg shadow-lg">
                  {user.displayName || "Anonymous User"}
                </div>
              </div>
              {/* Log Out Button */}
              <button
                onClick={onLogout}
                className="bg-red-100 text-red-700 px-4 py-1 rounded-md hover:bg-red-200"
              >
                Log Out
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `hover:text-blue-600 ${
                  isActive
                    ? "text-blue-700 font-semibold border-b-2 border-blue-700"
                    : ""
                }`
              }
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Small Screen Menu Icons */}
        <div className="flex md:hidden items-center">
          <button onClick={() => setOpen(!open)} className="text-4xl">
            {open ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Collapsible Menu for Small Screens */}
      {open && (
        <div
          className="absolute top-16 right-5 w-64 bg-gradient-to-r from-blue-100 to-blue-200 text-gray-700 z-10 shadow-lg rounded-lg transition-transform duration-300"
          style={{
            transform: open ? "translateY(0)" : "translateY(-200%)",
          }}
        >
          <div className="flex flex-col items-center py-5 space-y-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-blue-600 ${
                  isActive
                    ? "text-blue-700 font-semibold border-b-2 border-blue-700"
                    : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/available-donation"
              className={({ isActive }) =>
                `hover:text-blue-600 ${
                  isActive
                    ? "text-blue-700 font-semibold border-b-2 border-blue-700"
                    : ""
                }`
              }
            >
              Available Donations
            </NavLink>

            {user && (
              <>
                <NavLink
                  to="/donate"
                  className={({ isActive }) =>
                    `hover:text-blue-600 ${
                      isActive
                        ? "text-blue-700 font-semibold border-b-2 border-blue-700"
                        : ""
                    }`
                  }
                >
                  Donate
                </NavLink>
                <NavLink
                  to="/my-donations"
                  className={({ isActive }) =>
                    `hover:text-blue-600 ${
                      isActive
                        ? "text-blue-700 font-semibold border-b-2 border-blue-700"
                        : ""
                    }`
                  }
                >
                  My Donations
                </NavLink>
                <NavLink
                  to="/received-donations"
                  className={({ isActive }) =>
                    `hover:text-blue-600 ${
                      isActive
                        ? "text-blue-700 font-semibold border-b-2 border-blue-700"
                        : ""
                    }`
                  }
                >
                  Received Donations
                </NavLink>
              </>
            )}

            {user ? (
              <button
                onClick={onLogout}
                className="bg-red-100 text-red-700 px-4 py-1 rounded-md hover:bg-red-200"
              >
                Log Out
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hover:text-blue-600 ${
                    isActive
                      ? "text-blue-700 font-semibold border-b-2 border-blue-700"
                      : ""
                  }`
                }
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
