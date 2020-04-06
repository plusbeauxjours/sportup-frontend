import React from "react";
import MainNavigation from "../navigations/MainNavigation";
import { MeProvider } from "../context/meContext";

export default () => (
  <MeProvider>
    <MainNavigation />
  </MeProvider>
);
