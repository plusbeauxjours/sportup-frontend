import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginForm from "../screens/AuthScreen/LoginForm";
import BackBtn from "../components/BackBtn";
import SignupForm from "../screens/AuthScreen/SignupForm";
import MainDrawer from "./MainDrawer";

const Auth = createStackNavigator();

export default () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackImage: () => <BackBtn />,
      }}
    >
      <Auth.Screen
        name="Login"
        component={LoginForm}
        options={{ title: "Login" }}
      />
      <Auth.Screen
        name="SignUp"
        component={SignupForm}
        options={{ title: "SignUp" }}
      />
      <Auth.Screen name="MainDrawer" component={MainDrawer} />
    </Auth.Navigator>
  );
};
