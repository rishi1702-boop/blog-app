import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router";

import {
  pageWrapper,
  pageTitleClass,
  headingClass,
  bodyText,
  articleGrid,
  articleCardClass,
  articleTitle,
  articleExcerpt,
  articleMeta,
  errorClass,
  loadingClass
} from "../styles/common";

function AdminDashboard() {
  const { currentUser } = useAuthStore();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        // Fetch all articles using the user-api endpoint which works for ADMIN as well
        const res = await axios.get("http://localhost:4000/user-api/articles", {
          withCredentials: true
        });

        if (res.data.payload) {
          setArticles(res.data.payload);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser && currentUser.role === "ADMIN") {
      fetchAdminData();
    }
  }, [currentUser]);

  return (
    <div className={pageWrapper}>
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-12">
        <h1 className={pageTitleClass}>Admin Dashboard</h1>
      </div>

      {/* Overview Section */}
      <div>
        <h2 className={`${headingClass} mb-6`}>All Articles</h2>

        {error && <div className={`${errorClass} mb-6`}>{error}</div>}
        {loading && <div className={loadingClass}>Loading articles...</div>}

        {!loading && !error && articles.length === 0 ? (
          <p className={bodyText}>No articles published yet.</p>
        ) : (
          <div className={articleGrid}>
            {articles.map((article) => (
              <div 
                key={article._id} 
                className={articleCardClass}
                onClick={() => navigate(`/article/${article._id}`, { state: article })}
              >
                <h3 className={articleTitle}>{article.title}</h3>
                <p className={articleExcerpt}>
                  {article.content.slice(0, 120)}...
                </p>
                <p className={articleMeta}>
                  Category: {article.category} | Created:{" "}
                  {new Date(article.createdAt).toDateString()}
                </p>
                {/* Admin block/unblock UI could go here if we wanted to manage Articles */}


                {/* We won't add complex logic because we are not writing the backend */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;