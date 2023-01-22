import React from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PrivateRoute() {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useAuth();
  if (loading) {
    return (
      <div className="text-center mx-auto text-2xl font-mono font-semibold">
        Is Loading
      </div>
    );
  }
  if(isAuthenticated){
    return <Outlet />
  }
  else{
    toast.error("Access denied, please sign in")
    navigate('/sign-in')
  }
}

export default PrivateRoute;
