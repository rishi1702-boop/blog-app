
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import { API_URL } from "../config";

import {
  pageBackground,
  formCard,
  formTitle,
  inputClass,
  formGroup,
  submitBtn,
  errorClass,
  loadingClass,
  labelClass
} from "../styles/common.js";

function Register() {

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [preview, setPreview] = React.useState(null);


  const onRegister = async (newUser) => {
    try {
      setLoading(true);

      const formData = new FormData();
      let { role, profileImage, ...userObj } = newUser;
      
      formData.append("userObj", JSON.stringify(userObj));
      
      if (profileImage && profileImage.length > 0) {
        formData.append("profileImageUrl", profileImage[0]);
      }

      const endpoint = role === "AUTHOR" 
        ? `${API_URL}/author-api/users` 
        : `${API_URL}/user-api/users`;

      let resObj = await axios.post(endpoint, formData);

      if (resObj.status === 201) {
        navigate("/login");
      }

    } catch (err) {
      setError(err.response?.data?.error || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  if (loading) {
    return <p className={loadingClass}>Creating account...</p>;
  }

  return (
    <div className={`${pageBackground} flex items-center justify-center`}>

      <div className={formCard}>

        <h2 className={formTitle}>Create an Account</h2>

        {error && (
          <div className={errorClass}>{error}</div>
        )}

        <form onSubmit={handleSubmit(onRegister)}>

          {/* Role */}
          <div className={formGroup}>
            <p className={labelClass}>Register as</p>

            <div className="flex gap-6 mt-2">

              <label htmlFor="role-user" className="flex items-center gap-2">
                <input
                  id="role-user"
                  type="radio"
                  value="USER"
                  {...register("role")}
                />
                User
              </label>

              <label htmlFor="role-author" className="flex items-center gap-2">
                <input
                  id="role-author"
                  type="radio"
                  value="AUTHOR"
                  {...register("role")}
                />
                Author
              </label>

            </div>
          </div>

          {/* Names */}
          <div className="flex gap-4">

            <div className={formGroup}>
              <input
                type="text"
                placeholder="First name"
                aria-label="First name"
                autoComplete="given-name"
                {...register("firstName")}
                className={inputClass}
              />
            </div>

            <div className={formGroup}>
              <input
                type="text"
                placeholder="Last name"
                aria-label="Last name"
                autoComplete="family-name"
                {...register("lastName")}
                className={inputClass}
              />
            </div>

          </div>

          {/* Email */}
          <div className={formGroup}>
            <input
              type="email"
              placeholder="Email"
              aria-label="Email"
              autoComplete="email"
              {...register("email")}
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div className={formGroup}>
            <input
              type="password"
              placeholder="Password"
              aria-label="Password"
              autoComplete="new-password"
              {...register("password")}
              className={inputClass}
            />
          </div>
          {/* every event handler will handle implicitly by react hook form */}

          {/* Profile Image */}
          <div className={formGroup}>
            <input
              type="file"
              aria-label="Profile Image"
              accept="image/png, image/jpeg"
              {...register("profileImage", {
                onChange: (e) => {
                  //get image file
                  const file = e.target.files[0];
                  // validation for image format
                  if (file) {
                    if (!["image/jpeg", "image/png"].includes(file.type)) {
                      setError("Only JPG or PNG allowed");
                      return;
                    }
                    //validation for file size
                    if (file.size > 2 * 1024 * 1024) {
                      setError("File size must be less than 2MB");
                      return;
                    }
                    //Converts file → temporary browser URL(create preview URL)
                    const previewUrl = URL.createObjectURL(file);
                    setPreview(previewUrl);
                    setError(null);
                  }
                }
              })}
              className={inputClass}
            />
            {preview && (
              <div className="mt-4 flex justify-center">
                <img src={preview} alt="Profile Preview" className="w-24 h-24 rounded-full object-cover border-2 border-slate-300 shadow-lg" />
              </div>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className={submitBtn}
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;