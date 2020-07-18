import React, { useEffect } from "react";

import { AsyncStorage } from "react-native";
import Loader from "./Loader";

export default ({ navigation }) => {
  const checkAuthentication = async () => {
    try {
      const id = await AsyncStorage.getItem("jwt");
      navigation.navigate(id ? "Main" : "Auth");
    } catch (_) {
      navigation.navigate("Auth");
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return <Loader />;
};
