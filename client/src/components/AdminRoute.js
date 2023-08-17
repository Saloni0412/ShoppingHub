import React, { useContext } from "react";
import { Store } from "../Store";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  // destructure state from Store
  const { state } = useContext(Store);
  // destructure userInfo from state
  const { userInfo } = state;
  // if not authenticated, redirect to signin page
  return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />;
}
