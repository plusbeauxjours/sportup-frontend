import { createStackNavigator } from "react-navigation-stack";
import { PRIMARY_COLOR } from "../constants/colors";

import UserProfileScreen from "../screens/UserProfileScreen";
import FollowersScreen from "../screens/FollowersScreen";
import FollowingScreen from "../screens/FollowingScreen";
import TeamsScreen from "../screens/TeamsScreen";
import TeamProfileScreen from "../screens/TeamProfileScreen";
import EditTeamProfileScreen from "../screens/EditTeamProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import EventScreen from "../screens/EventScreen/EventScreen";
import RegisterForEventScreen from "../screens/RegisterForEventScreen/RegisterForEventScreen";
import RegistrationScreen from "../screens/RegistrationScreen/index";

const SearchNavigation = createStackNavigator(
  {
    SearchScreen,
    UserProfileScreen,
    FollowersScreen,
    FollowingScreen,
    TeamsScreen,
    TeamProfileScreen,
    EditTeamProfileScreen,
    EventScreen,
    RegisterForEventScreen,
    RegistrationScreen,
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
