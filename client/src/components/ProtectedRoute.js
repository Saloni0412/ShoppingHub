import React, { useContext } from "react";
import { Store } from "../Store";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // destructure state from Store
  const { state } = useContext(Store);
  // destructure userInfo from state
  const { userInfo } = state;
  // if userInfo is true, return children, else return Navigate to signin
  return userInfo ? children : <Navigate to="/signin" />;
}
