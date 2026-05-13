import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import {
  pageWrapper,
  pageTitleClass,
  bodyText,
  secondaryBtn,
  divider,
  articleBody,
  tagClass,
  pageBackground,
  formCard,
  inputClass,
  submitBtn,
} from '../styles/common';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_URL } from '../config';

function ArticleDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useAuthStore();

  const [commentText, setCommentText] = React.useState("");
  const [comments, setComments] = React.useState(state?.comments || []);
  const [article, setArticle] = React.useState(state);
  const [loading, setLoading] = React.useState(false);

  // ✅ Fetch latest article data
  React.useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/user-api/articles/${state?._id}`,
          { withCredentials: true }
        );
        if (res.data.payload) {
          setArticle(res.data.payload);
          setComments(res.data.payload.comments || []);
        }
      } catch (err) {
        console.error("Error fetching article:", err);
      }
    };

    if (state?._id) {
      fetchArticle();
    }
  }, [state?._id]);

  if (!article) {
    return (
      <div className={pageWrapper}>
        <div className="max-w-3xl mx-auto text-center py-20">
          <p className={bodyText}>Article not found.</p>
          <button
            className={`${secondaryBtn} mt-6`}
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Check if current user is author
  const isAuthor =
    currentUser?._id &&
    article?.author?._id &&
    currentUser._id === article.author._id;

  // Add Comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/user-api/articles/${article._id}/comment`,
        { comment: commentText },
        { withCredentials: true }
      );

      if (res.data.message === "Comment added") {
        toast.success("Comment added");
        setCommentText("");
        setComments(res.data.payload.comments);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  //  Delete Comment
  const handleDeleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `${API_URL}/user-api/articles/${article._id}/comments/${commentId}`,
        { withCredentials: true }
      );

      if (res.data.message === "Comment deleted") {
        toast.success("Comment deleted");
        setComments(res.data.payload.comments);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className={`${pageBackground} py-12 px-4`}>
      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <button
          className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-violet-600 mb-8 ml-4"
          onClick={() => navigate(-1)}
        >
          ← Back to articles
        </button>

        {/* Main Card */}
        <div className={`${formCard} !max-w-none !p-8 md:!p-16 shadow-xl`}>

          {/* Header */}
          <header className="mb-10 text-center">
            {article.category && (
              <div className={`${tagClass} mx-auto mb-6`}>
                {article.category}
              </div>
            )}

            <h1 className={`${pageTitleClass} !text-3xl md:!text-5xl !mb-8`}>
              {article.title}
            </h1>

            <div className="flex justify-center gap-4 text-sm text-slate-500">
              <span>
                {article.author?.firstName} {article.author?.lastName}
              </span>
              <span>•</span>
              <span>
                {new Date(article.createdAt).toLocaleDateString()}
              </span>
            </div>
          </header>

          <div className={divider}></div>

          {/* Content */}
          <article className={`${articleBody} max-w-3xl mx-auto`}>
            {article.content.split('\n').map((p, i) =>
              p.trim() && <p key={i} className="mb-6">{p}</p>
            )}
          </article>

          {/* Comments */}
          <div className={divider}></div>

          <div className="max-w-3xl mx-auto">

            <h3 className="text-2xl font-bold mb-6">
              Comments ({comments.length})
            </h3>

            {/* Comment List */}
            {comments.length === 0 ? (
              <p className="text-gray-500 italic">
                No comments yet.
              </p>
            ) : (
              <div className="space-y-4 mb-10">
                {comments.map((c) => (
                  <div key={c._id} className="border p-4 rounded-xl">

                    <div className="flex justify-between">
                      <span className="font-bold">
                        {c.user?.username}
                      </span>

                      {(currentUser?.username === c.user?.username ||
                        isAuthor) && (
                        <button
                          onClick={() => handleDeleteComment(c._id)}
                          className="text-red-500 text-xs"
                        >
                          Delete
                        </button>
                      )}
                    </div>

                    <p className="mt-2">{c.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {/*  COMMENT FORM LOGIC */}
            {isAuthenticated && !isAuthor ? (
              <form onSubmit={handleAddComment}>
                <textarea
                  className={`${inputClass} w-full mb-4`}
                  placeholder="Write your thoughts..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button className={submitBtn} disabled={loading}>
                  {loading ? "Posting..." : "Post Comment"}
                </button>
              </form>

            )  : (
              <div className="text-center">
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetails;