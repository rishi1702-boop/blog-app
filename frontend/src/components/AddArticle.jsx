import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";
import { API_URL } from "../config";

import {
  pageWrapper,
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass
} from "../styles/common";

function AddArticle() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);

      // We need to pass the token because the endpoint is protected
      const token = localStorage.getItem("token");

      const articleData = {
        ...data,
        author: currentUser._id
      };

      const res = await axios.post(
        `${API_URL}/author-api/articles`,
        articleData,
        {
          headers: {
            Authorization: `Bearer ${token}` // Usually it's passed here, or if backend uses cookies, withCredentials
            // But let's check verifyToken middleware... wait, I don't have verifyToken code. 
            // In UserDashboard, we use credentials: "include" which implies cookie-based tokens or something, but verifyToken usually expects Bearer OR it reads cookies.
            // Oh right, CommonAPI.js does `res.cookie("token", token)` so it's a cookie! Wait, no, localStorage is also set in authStore. 
          },
          withCredentials: true
        }
      );

      if (res.status === 201) {
        toast.success("Article created successfully");
        reset();
        setTimeout(() => {
          navigate("/author-dashboard");
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create article");
      toast.error("Failed to create article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={pageWrapper}>

      <div className={formCard}>
        <h2 className={formTitle}>Publish Article</h2>

        {error && <div className={errorClass}>{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div className={formGroup}>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              placeholder="Enter article title"
              className={inputClass}
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          {/* Category */}
          <div className={formGroup}>
            <label className={labelClass}>Category</label>
            <input
              type="text"
              placeholder="Enter category"
              className={inputClass}
              {...register("category", { required: "Category is required" })}
            />
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>

          {/* Content */}
          <div className={formGroup}>
            <label className={labelClass}>Content</label>
            <textarea
              placeholder="Write your article content..."
              className={`${inputClass} h-40 resize-none`}
              {...register("content", { required: "Content is required" })}
            />
            {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
          </div>

          {/* Publish Button */}
          <button type="submit" className={submitBtn} disabled={loading}>
            {loading ? "Publishing..." : "Publish"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddArticle;
