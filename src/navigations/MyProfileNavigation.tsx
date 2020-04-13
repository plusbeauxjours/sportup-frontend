import { createStackNavigator } from "react-navigation-stack";
import { PRIMARY_COLOR } from "../constants/colors";

import MyProfileScreen from "../screens/MyProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import FollowersScreen from "../screens/FollowersScreen";
import FollowingScreen from "../screens/FollowingScreen";
import TeamsScreen from "../screens/TeamsScreen";
import TeamProfileScreen from "../screens/TeamProfileScreen";
import CreateTeamScreen from "../screens/CreateTeamScreen";
import EditTeamProfileScreen from "../screens/EditTeamProfileScreen";
import EditSportsScreen from "../screens/EditSportsScreen";

const MyProfileNavigation = createStackNavigator(
  {
    MyProfileScreen,
    EditProfileScreen,
    UserProfileScreen,
    FollowersScreen,
    FollowingScreen,
    TeamsScreen,
    TeamProfileScreen,
    CreateTeamScreen,
    EditTeamProfileScreen,
    EditSportsScreen,
  },
  {
    initialRouteName: "MyProfileScreen",
    navigationOptions: {
      headerStyle: {
        backgroundColor: PRIMARY_COLOR,
      },
      headerTintColor: "#fff",
    },
  }
);

export default MyProfileNavigation;
