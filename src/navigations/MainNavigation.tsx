import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./AuthNavigation";
import { AsyncStorage } from "react-native";
import MainDrawer from "./MainDrawer";
import Loader from "../components/Loader";
import { createStackNavigator } from "@react-navigation/stack";

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

  const RootStack = createStackNavigator();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <NavigationContainer>
      <RootStack.Navigator
        headerMode="none"
        initialRouteName={userToken ? "MainDrawer" : "AuthNavigation"}
      >
        <RootStack.Screen name="MainDrawer" component={MainDrawer} />
        <RootStack.Screen name="AuthNavigation" component={AuthNavigation} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
