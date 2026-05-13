/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router';
import { Toaster, toast } from 'react-hot-toast'
import {
  pageWrapper,
  pageTitleClass,
  primaryBtn,
  cardClass,
  headingClass,
  bodyText,
  articleMeta,
  articleGrid,
  articleCardClass,
  articleTitle,
  articleExcerpt,
  errorClass,
  loadingClass
} from '../styles/common';

function UserDashboard() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const currentUser = useAuthStore((state) => state.currentUser);

  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch articles when authenticated
  useEffect(() => {
    async function getArticles() {
      try {
        if (isAuthenticated) {
          setLoading(true);
          let res = await fetch("http://localhost:4000/user-api/articles", {
            method: "GET",
            credentials: "include"
          });

          if (res.status === 200) {
            let resObj = await res.json();
            setArticles(resObj.payload);
          } else {
            setError("Failed to fetch articles");
          }
        }
      } catch (err) {
        setError("Error fetching articles");
      } finally {
        setLoading(false);
      }
    }

    getArticles();
  }, [isAuthenticated]);

  return (
    <div className={pageWrapper}>

      {/* Top Bar */}
      <div className="flex justify-between items-center mb-12">
        <h1 className={pageTitleClass}>Welcome {currentUser?.firstName}</h1>
      </div>

      {/* Articles Section */}
      <div>
        <h2 className={`${headingClass} mb-6`}>Latest Articles</h2>

        {error && <div className={`${errorClass} mb-6`}>{error}</div>}
        {loading && <div className={loadingClass}>Loading articles...</div>}

        {!loading && !error && articles.length === 0 ? (
          <p className={bodyText}>No articles currently available.</p>
        ) : (
          <div className={articleGrid}>
            {articles.map((article, idx) => (
              <div
                key={article._id || idx}
                className={articleCardClass}
                onClick={() => navigate(`/article/${article._id || idx}`, { state: article })}
              >
                <h3 className={articleTitle}>{article.title}</h3>
                <p className={articleExcerpt}>
                  {article.content ? article.content.slice(0, 120) : ""}...
                </p>
                <div className="flex justify-between items-center mt-4">
                  <p className={articleMeta}>
                    Category: {article.category || "General"} | Published: {new Date(article.createdAt || Date.now()).toDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
