import { create } from "zustand";
import axios from "axios";
import { API_URL } from "../config";

export const useAuthStore = create((set) => ({
  currentUser: (() => {
    try {
      const user = localStorage.getItem("currentUser");
      return user && user !== "undefined" ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  })(),
  token: localStorage.getItem("token") || null,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  loading: false,
  error: null,

  // LOGIN
  login: async (userCred) => {
    set({ loading: true, error: null });
    try {

      const res = await axios.post(
        `${API_URL}/common-api/login`,
        userCred,
        { withCredentials: true }
      );

      if (res.data.message === "login success") {

        const user = res.data.payload;

        // Since the backend sets the token in an HttpOnly cookie, we don't have access to the raw token string
        // We set a dummy token flag in localStorage so the app knows we are authenticated
        localStorage.setItem("token", "cookie-stored");
        localStorage.setItem("currentUser", JSON.stringify(user));

        set({
          currentUser: user,
          token: "cookie-stored",
          isAuthenticated: true,
          loading: false,
          error: null
        });

      } else {
        set({ error: res.data.message, loading: false });
      }

    } catch (err) {
      console.log("Login error:", err);
      set({ error: "Login failed", loading: false });
    }
  },
  //Check_Auth
  checkAuth: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/common-api/check-auth`, {
        withCredentials: true,
      });

      if (res.data.message === "authenticated") {
        const user = res.data.payload;
        localStorage.setItem("token", "cookie-stored");
        localStorage.setItem("currentUser", JSON.stringify(user));

        set({
          currentUser: user,
          token: "cookie-stored",
          isAuthenticated: true,
          loading: false,
          error: null
        });
      }
    } catch (err) {
      console.log("Check auth error:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      set({
        currentUser: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
      });
    }
  },

  // LOGOUT
  logout: async () => {
    try {
      await axios.get(`${API_URL}/common-api/logout`, {
        withCredentials: true,
      });
    } catch (err) {
      console.log("Logout API error:", err);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");

    set({
      currentUser: null,
      token: null,
      isAuthenticated: false
    });
  }
}));