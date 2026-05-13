import React from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";

import {
  navbarClass,
  navContainerClass,
  navBrandClass,
  navLinksClass,
  navLinkClass,
  navLinkActiveClass,
  secondaryBtn
} from "../styles/common";

function Header() {
  const { isAuthenticated, currentUser, logout } = useAuthStore();
  const navigate = useNavigate();

   const handleLogout = async () => {
    await logout();
    toast.success("Logout successful");
    navigate('/');
  };

  return (
    <header className={navbarClass}>

      <div className={navContainerClass}>

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' className="w-5 h-5">
              <path d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'/>
            </svg>
          </div>

          <span className={navBrandClass}>
            Blog Platform
          </span>
        </div>

        {/* Navigation */}
        <nav className={navLinksClass}>

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? navLinkActiveClass : navLinkClass
            }
          >
            Home
          </NavLink>

          {isAuthenticated && (
            <NavLink
              to={
                currentUser?.role === "AUTHOR"
                  ? "/author-dashboard"
                  : currentUser?.role === "ADMIN"
                  ? "/admin-dashboard"
                  : "/user-dashboard"
              }
              className={({ isActive }) =>
                isActive ? navLinkActiveClass : navLinkClass
              }
            >
              Dashboard
            </NavLink>
          )}

          {!isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? navLinkActiveClass : navLinkClass
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? navLinkActiveClass : navLinkClass
                }
              >
                Register
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-5 ml-2 border-l border-slate-200 pl-5">
              <span className="text-sm font-semibold text-slate-800">
                {currentUser?.username}
              </span>
              {currentUser?.profileImageUrl && (
                <img
                  src={currentUser.profileImageUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-slate-200 shadow-sm"
                />
              )}
              <button
                onClick={handleLogout}
                className={secondaryBtn}
              >
                Logout
              </button>
            </div>
          )}

        </nav>

      </div>

    </header>
  );
}

export default Header;
