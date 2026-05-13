import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

import {
  pageWrapper,
  pageTitleClass,
  headingClass,
  bodyText,
  primaryBtn,
  articleGrid,
  articleCardClass,
  articleTitle,
  articleExcerpt,
  articleMeta
} from "../styles/common";

function AuthorDashboard() {

  const { currentUser } = useAuthStore();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {

    const getArticles = async () => {
      try {

        const res = await axios.get(
          `http://localhost:4000/author-api/articles/${currentUser._id}`,
          { withCredentials: true }
        );

        if (res.data.message === "Fetched articles" || res.data.message === "author articles" || res.data.allArticles) {
          setArticles(res.data.allArticles || res.data.payload);
        }

      } catch (error) {
        console.log("Error fetching articles:", error);
      }
    };

    if (currentUser) {
      getArticles();
    }

  }, [currentUser]);

  const handleToggleStatus = async (articleId, currentStatus) => {
    try {
      const res = await axios.patch(
        `http://localhost:4000/author-api/articles/${articleId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.payload) {
        setArticles((prev) =>
          prev.map((a) =>
            a._id === articleId
              ? { ...a, isArticleActive: res.data.payload.isArticleActive }
              : a
          )
        );
        toast.success(
          currentStatus ? "Article deactivated" : "Article reactivated"
        );
      }
    } catch (err) {
      console.error("Toggle error:", err);
      toast.error("Failed to update article status");
    }
  };


  return (
    <div className={pageWrapper}>


      {/* Top Bar */}
      <div className="flex justify-between items-center mb-12">
        <h1 className={pageTitleClass}>
          Welcome, {currentUser?.firstName}
        </h1>
      </div>


      {/* Articles Section */}
      <div>

        <div className="flex justify-between items-center mb-6">
          <h2 className={headingClass}>
            My Articles
          </h2>
          <button
            className={primaryBtn}
            onClick={() => navigate('/add-article')}
          >
            Add Article
          </button>
        </div>

        {articles.length === 0 ? (

          <p className={bodyText}>
            No articles published yet.
          </p>

        ) : (

          <div className={articleGrid}>

            {articles.map((article) => (

              <div
                key={article._id}
                className={`${articleCardClass} ${!article.isArticleActive ? "opacity-60" : ""}`}
                onClick={() => navigate(`/article/${article._id}`, { state: article })}
              >

                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      article.isArticleActive
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-red-100 text-red-600 border border-red-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        article.isArticleActive ? "bg-emerald-500" : "bg-red-500"
                      }`}
                    ></span>
                    {article.isArticleActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <h3 className={articleTitle}>
                  {article.title}
                </h3>

                <p className={articleExcerpt}>
                  {article.content.slice(0, 120)}...
                </p>

                <div className="flex justify-between items-center mt-4 gap-2">
                  <p className={articleMeta}>
                    {new Date(article.createdAt || new Date()).toDateString()}
                  </p>

                  <div className="flex items-center gap-2">
                    {/* Toggle Active/Inactive Button */}
                    <button
                      className={`py-1.5 px-3 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
                        article.isArticleActive
                          ? "border-red-200 text-red-600 bg-red-50 hover:bg-red-100"
                          : "border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStatus(article._id, article.isArticleActive);
                      }}
                    >
                      {article.isArticleActive ? "Deactivate" : "Reactivate"}
                    </button>

                    {/* Edit Button */}
                    <button
                      className={`${primaryBtn} py-1.5 px-4 text-xs tracking-wider`}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/edit-article', { state: article });
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default AuthorDashboard;