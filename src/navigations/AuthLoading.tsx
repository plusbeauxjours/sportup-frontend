import React, { useEffect, useState } from "react";

import { AsyncStorage } from "react-native";
import MainDrawer from "./MainDrawer";
import AuthNavigation from "./AuthNavigation";
import Loader from "../components/Loader";

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const checkAuthentication = async () => {
    try {
      const token = await AsyncStorage.getItem("jwt");
      setUserToken(token);
      setIsLoading(false);
    } catch (_) {
      return <AuthNavigation />;
    }
  };
  useEffect(() => {
    checkAuthentication();
  }, []);
  if (isLoading) {
    return <Loader />;
  } else {
    if (userToken) {
      return <MainDrawer />;
    } else {
      return <AuthNavigation />;
    }
  }
};
