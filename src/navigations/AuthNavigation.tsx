import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginForm from "../screens/AuthScreen/LoginForm";
import SignupForm from "../screens/AuthScreen/SignupForm";
import BackBtn from "../components/BackBtn";

const Auth = createStackNavigator();

export default () => (
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
  </Auth.Navigator>
);
