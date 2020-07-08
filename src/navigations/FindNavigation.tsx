import { createStackNavigator } from "react-navigation-stack";
import { PRIMARY_COLOR } from "../constants/colors";

import UserProfileScreen from "../screens/UserProfileScreen";
import FollowersScreen from "../screens/FollowersScreen";
import FollowingScreen from "../screens/FollowingScreen";
import TeamsScreen from "../screens/TeamsScreen";
import TeamProfileScreen from "../screens/TeamProfileScreen";
import FindPlayerScreen from "../screens/FindPlayerScreen";

const FindNavigation = createStackNavigator(
  {
    FindPlayerScreen,
    UserProfileScreen,
    FollowersScreen,
    FollowingScreen,
    TeamsScreen,
    TeamProfileScreen,
  },
  {
    initialRouteName: "UserProfileScreen",
    navigationOptions: {
      headerStyle: {
        backgroundColor: PRIMARY_COLOR,
      },
      headerTintColor: "#fff",
    },
  }
);

export default FindNavigation;
