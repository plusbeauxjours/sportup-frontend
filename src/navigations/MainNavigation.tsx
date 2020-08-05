import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainDrawer from "./MainDrawer";
import AuthNavigation from "./AuthNavigation";

export default () => {
  return (
    <NavigationContainer>
      {/* <AuthLoadingContainer /> */}
      <MainDrawer />
      {/* <AuthNavigation /> */}
    </NavigationContainer>
  );
};
