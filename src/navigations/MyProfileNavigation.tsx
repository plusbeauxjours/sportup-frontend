import { createStackNavigator } from "react-navigation-stack";
import { PRIMARY_COLOR } from "../constants/colors";
import MyProfile from "../screens/MyProfile";

const MyProfileNavigation = createStackNavigator(
  {
    MyProfile: MyProfile
  },
  {
    initialRouteName: "MyProfile",
    navigationOptions: {
      headerStyle: {
        backgroundColor: PRIMARY_COLOR
      },
      headerTintColor: "#fff"
    }
  }
);

export default MyProfileNavigation;
