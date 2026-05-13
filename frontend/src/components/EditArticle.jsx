import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-hot-toast";

import {
  pageBackground,
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  secondaryBtn
} from "../styles/common";

function EditArticle() {
  const { state } = useLocation();
  const article = state;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: article?.title || "",
      category: article?.category || "",
      content: article?.content || ""
    }
  });

  if (!article) {
    return (
      <div className={pageBackground}>
         <div className="max-w-md mx-auto py-20 text-center">
            <p className="text-gray-500 mb-4">No article data found.</p>
            <button className={secondaryBtn} onClick={() => navigate(-1)}>Go Back</button>
         </div>
      </div>
    );
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.put(
        `http://localhost:4000/author-api/articles/${article._id}`,
        data,
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success("Article updated successfully");
        setTimeout(() => {
          navigate("/author-dashboard");
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update article");
      toast.error("Failed to update article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={pageBackground}>

      <div className={formCard}>
        <button className={`${secondaryBtn} mb-6`} onClick={() => navigate(-1)}>
          &larr; Back
        </button>
        <h2 className={formTitle}>Edit Article</h2>

        {error && <div className={errorClass}>{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div className={formGroup}>
            <label className={labelClass}>Title</label>
            <input
              type="text"
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
              className={inputClass}
              {...register("category", { required: "Category is required" })}
            />
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>

          {/* Content */}
          <div className={formGroup}>
            <label className={labelClass}>Content</label>
            <textarea
              className={`${inputClass} h-40 resize-none`}
              {...register("content", { required: "Content is required" })}
            />
            {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
          </div>

          <button type="submit" className={submitBtn} disabled={loading}>
            {loading ? "Updating..." : "Update Article"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditArticle;
