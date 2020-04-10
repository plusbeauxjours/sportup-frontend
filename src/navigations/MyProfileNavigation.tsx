import { createStackNavigator } from "react-navigation-stack";
import { PRIMARY_COLOR } from "../constants/colors";

import MyProfile from "../screens/MyProfile";
import EditProfile from "../screens/EditProfile";
import UserProfile from "../screens/UserProfile";
import Followers from "../screens/Followers";
import Following from "../screens/Following";
import Teams from "../screens/Teams";
import TeamProfile from "../screens/TeamProfile";
import CreateTeamScreen from "../screens/CreateTeamScreen";

const MyProfileNavigation = createStackNavigator(
  {
    MyProfile,
    EditProfile,
    UserProfile,
    Followers,
    Following,
    Teams,
    TeamProfile,
    CreateTeamScreen,
  },
  {
    initialRouteName: "MyProfile",
    navigationOptions: {
      headerStyle: {
        backgroundColor: PRIMARY_COLOR,
      },
      headerTintColor: "#fff",
    },
  }
);

export default MyProfileNavigation;
