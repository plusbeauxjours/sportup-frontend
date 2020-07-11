import { createStackNavigator } from "react-navigation-stack";
import { PRIMARY_COLOR } from "../constants/colors";

import UserProfileScreen from "../screens/UserProfileScreen";
import FollowersScreen from "../screens/FollowersScreen";
import FollowingScreen from "../screens/FollowingScreen";
import TeamsScreen from "../screens/TeamsScreen";
import TeamProfileScreen from "../screens/TeamProfileScreen";
import EditTeamProfileScreen from "../screens/EditTeamProfileScreen";
import MainTournamentScreen from "../screens/MainTournamentScreen/MainTournamentScreen";
import UpcomingEventScreen from "../screens/UpcomingEventScreen/index";
import CreateEventScreen from "../screens/CreateEventScreen/CreateEventScreenQueries";

const EventNavigation = createStackNavigator(
  {
    MainTournamentScreen,
    UpcomingEventScreen,
    CreateEventScreen,
    // EventScreen,
    // RegisterForEventScreen,
    // RegistrationScreen,
    UserProfileScreen,
    FollowersScreen,
    FollowingScreen,
    TeamsScreen,
    TeamProfileScreen,
    EditTeamProfileScreen,
  },
  {
    initialRouteName: "MainTournamentScreen",
    navigationOptions: {
      headerStyle: {
        backgroundColor: PRIMARY_COLOR,
      },
      headerTintColor: "#fff",
    },
  }
);

export default EventNavigation;
