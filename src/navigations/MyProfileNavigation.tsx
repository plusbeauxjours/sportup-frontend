import { createStackNavigator } from "react-navigation-stack";
import { PRIMARY_COLOR } from "../constants/colors";
import MyProfile from "../screens/MyProfile";
import EditProfile from "../screens/EditProfile/EditProfile";

const MyProfileNavigation = createStackNavigator(
  {
    MyProfile: MyProfile,
    EditProfile: EditProfile
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
