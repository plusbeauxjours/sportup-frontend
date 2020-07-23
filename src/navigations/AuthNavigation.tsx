import { createStackNavigator } from "react-navigation-stack";

import LoginForm from "../screens/AuthScreen/LoginForm";
import SignupForm from "../screens/AuthScreen/SignupForm";

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: LoginForm },
    SignUp: { screen: SignupForm },
  },
  { initialRouteName: "Login" }
);

export default AuthNavigation;
