import React from "react";
import DashboardScreen from "./DashboardScreen";
import LoginScreen from "./LoginScreen";
import { useAuthState } from "../utils/hooks";

function HomeScreen(props) {
  const isAuthenticated = useAuthState();
  return isAuthenticated ? (
    <DashboardScreen {...props} />
  ) : (
    <LoginScreen {...props} />
  );
}

export default HomeScreen;
