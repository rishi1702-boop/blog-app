
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";

// import styles
import {
  pageBackground,
  formCard,
  formTitle,
  inputClass,
  formGroup,
  submitBtn
} from "../styles/common";

function Login() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const currentUser = useAuthStore((state) => state.currentUser);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  // LOGIN FUNCTION
  const onLogin = async (userCredObj) => {
    await login(userCredObj);
  };

  // REDIRECT AFTER LOGIN
  useEffect(() => {
    if (isAuthenticated && currentUser) {

      toast.success("Login Successful");

      if (currentUser.role === "USER") {
        navigate("/user-dashboard");
      }

      if (currentUser.role === "AUTHOR") {
        navigate("/author-dashboard");
      }

      if (currentUser.role === "ADMIN") {
        navigate("/admin-dashboard");
      }
    }
  }, [isAuthenticated, currentUser, navigate]);

  return (
    <div className={`${pageBackground} flex items-center justify-center`}>


      <div className={formCard}>

        <h2 className={formTitle}>Login</h2>

        <form onSubmit={handleSubmit(onLogin)}>

          {/* Email */}
          <div className={formGroup}>
            <input
              type="email"
              placeholder="Email"
              aria-label="Email"
              autoComplete="email"
              className={inputClass}
              {...register("email", { required: "Email is required" })}
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className={formGroup}>
            <input
              type="password"
              placeholder="Password"
              aria-label="Password"
              autoComplete="current-password"
              className={inputClass}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Server Error Message */}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={submitBtn}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;