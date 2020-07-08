import { createStackNavigator } from "react-navigation-stack";
import { PRIMARY_COLOR } from "../constants/colors";

import UserProfileScreen from "../screens/UserProfileScreen";
import FollowersScreen from "../screens/FollowersScreen";
import FollowingScreen from "../screens/FollowingScreen";
import TeamsScreen from "../screens/TeamsScreen";
import TeamProfileScreen from "../screens/TeamProfileScreen";
import EditTeamProfileScreen from "../screens/EditTeamProfileScreen";
import SearchScreen from "../screens/SearchScreen";

const SearchNavigation = createStackNavigator(
  {
    SearchScreen,
    UserProfileScreen,
    // FollowersScreen,
    // FollowingScreen,
    // TeamsScreen,
    TeamProfileScreen,
    EditTeamProfileScreen,
  },
  {
    initialRouteName: "SearchScreen",
    navigationOptions: {
      headerStyle: {
        backgroundColor: PRIMARY_COLOR,
      },
      headerTintColor: "#fff",
    },
  }
);

export default SearchNavigation;
