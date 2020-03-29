import { createStackNavigator } from "react-navigation-stack";

import LoginForm from "../components/Auth/LoginForm";
import SignupForm from "../components/Auth/SignupForm";

import { PRIMARY_COLOR } from "../constants/colors";

const AuthStack = createStackNavigator(
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

export default AuthStack;
