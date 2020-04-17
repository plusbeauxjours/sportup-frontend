import { createStackNavigator } from "react-navigation-stack";
import { PRIMARY_COLOR } from "../constants/colors";

import UserProfileScreen from "../screens/UserProfileScreen";
import FollowersScreen from "../screens/FollowersScreen";
import FollowingScreen from "../screens/FollowingScreen";
import TeamsScreen from "../screens/TeamsScreen";
import TeamProfileScreen from "../screens/TeamProfileScreen";
import EditTeamProfileScreen from "../screens/EditTeamProfileScreen";

const FeedStack = createStackNavigator(
  {
    UserProfileScreen,
    FollowersScreen,
    FollowingScreen,
    TeamsScreen,
    TeamProfileScreen,
    EditTeamProfileScreen,
  },
  {
    initialRouteName: "Search",
    navigationOptions: {
      headerStyle: {
        backgroundColor: PRIMARY_COLOR,
      },
      headerTintColor: "#fff",
    },
  }
);

export default FeedStack;
