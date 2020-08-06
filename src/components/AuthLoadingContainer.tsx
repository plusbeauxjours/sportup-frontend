import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { AsyncStorage } from "react-native";
import Loader from "./Loader";

export default () => {
  const navigation = useNavigation();
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
