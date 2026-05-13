import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
function RootLayout() {
  const checkAuth= useAuthStore((state)=>state.checkAuth)
  const loading =useAuthStore((state)=>state.loading)
  useEffect(() => {
    checkAuth()
  }, []);
  if(loading){
    return <h2>Loading</h2>
  }
  return (
    <div>
      <Header />

      <div className="min-h-screen">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default RootLayout;