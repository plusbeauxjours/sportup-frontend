import { createStackNavigator } from "react-navigation-stack";

import LoginForm from "../screens/Auth/LoginForm";
import SignupForm from "../screens/Auth/SignupForm";

import { PRIMARY_COLOR } from "../constants/colors";

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: LoginForm },
    SignUp: { screen: SignupForm }
  },
  {
    initialRouteName: "Login",
    navigationOptions: {
      headerStyle: {
        backgroundColor: PRIMARY_COLOR
      },
      headerTintColor: "#fff"
    }
  }
);

export default AuthNavigation;
