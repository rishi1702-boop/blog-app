import React from "react";
import { Link } from "react-router";

import {
  footerClass,
  footerContainerClass,
  footerTextClass,
  footerLinkClass
} from "../styles/common";

function Footer() {
  return (
    <footer className={footerClass}>
      
      <div className={footerContainerClass}>

        {/* App Name */}
        <div className="text-lg font-semibold">
          Blog Platform
        </div>

        {/* Navigation */}
        <div className="flex gap-6">
          <Link to="/" className={footerLinkClass}>
            Home
          </Link>

          <Link to="/add-article" className={footerLinkClass}>
            Add Article
          </Link>

          <Link to="/login" className={footerLinkClass}>
            Login
          </Link>

          <Link to="/register" className={footerLinkClass}>
            Register
          </Link>
        </div>

        {/* Copyright */}
        <div className={footerTextClass}>
          © {new Date().getFullYear()} Blog Platform. All rights reserved.
        </div>

      </div>

    </footer>
  );
}

export default Footer;