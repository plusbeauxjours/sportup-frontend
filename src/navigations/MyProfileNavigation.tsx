import { createStackNavigator } from "react-navigation-stack";
import { PRIMARY_COLOR } from "../constants/colors";

import MyProfile from "../screens/MyProfile";
import EditProfile from "../screens/EditProfile";
import UserProfile from "../screens/UserProfile";

const MyProfileNavigation = createStackNavigator(
  {
    MyProfile: MyProfile,
    EditProfile: EditProfile,
    UserProfile: UserProfile
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
