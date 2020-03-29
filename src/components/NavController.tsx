import React from "react";
import MainNavigation from "../navigations/MainNavigation";
import { MeProvider } from "../context/MeContext";
import AuthNavigation from "../navigations/AuthNavigation";
import { useIsLoggedIn } from "../context/AuthContext";

export default () => {
  const isLoggedIn = useIsLoggedIn();
  return isLoggedIn ? (
    <MeProvider>
      <MainNavigation />
    </MeProvider>
  ) : (
    <AuthNavigation />
  );
};
