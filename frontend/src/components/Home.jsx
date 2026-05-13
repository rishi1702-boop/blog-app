import React from "react";
import { Link } from "react-router";

import {
  containerClass,
  pageTitleClass,
  buttonPrimaryClass,
  buttonSecondaryClass,
  bodyText,
  headingClass,
  articleGrid,
  articleCardClass,
  articleTitle,
  articleExcerpt
} from "../styles/common";

function Home() {
  return (
    <div className={containerClass}>

      {/* Hero Section */}
      <div className="text-center py-16 relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-200/50 via-white/0 to-white/0 rounded-full blur-3xl"></div>
          
        <h1 className={pageTitleClass}>
          Welcome to the Blog Platform
        </h1>

        <p className={`${bodyText} mt-6 max-w-2xl mx-auto text-lg`}>
          Discover insightful articles written by talented authors. 
          Share your knowledge, read amazing content, and join our 
          growing blogging community.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-5 mt-10">

          <Link
            to="/register"
            className={buttonPrimaryClass}
          >
            Start Writing
          </Link>

          <Link
            to="/login"
            className={buttonSecondaryClass}
          >
            Login
          </Link>

        </div>

      </div>


      {/* Latest Articles Section */}
      <div className="mt-20">

        <h2 className={headingClass + " mb-8"}>
          Latest Articles
        </h2>

        <div className={articleGrid}>

          {/* Placeholder cards (later replace with API data) */}

          <div className={articleCardClass}>
            <h3 className={articleTitle}>
              React Best Practices
            </h3>

            <p className={articleExcerpt}>
              Learn modern patterns for building scalable React applications.
            </p>
          </div>

          <div className={articleCardClass}>
            <h3 className={articleTitle}>
              Node.js Performance Tips
            </h3>

            <p className={articleExcerpt}>
              Improve backend performance using these practical Node techniques.
            </p>
          </div>

          <div className={articleCardClass}>
            <h3 className={articleTitle}>
              MongoDB Indexing Guide
            </h3>

            <p className={articleExcerpt}>
              Understand indexes and optimize database queries.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;