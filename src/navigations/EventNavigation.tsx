import { createStackNavigator } from "react-navigation-stack";
import { PRIMARY_COLOR } from "../constants/colors";

import UserProfileScreen from "../screens/UserProfileScreen";
import FollowersScreen from "../screens/FollowersScreen";
import FollowingScreen from "../screens/FollowingScreen";
import TeamsScreen from "../screens/TeamsScreen";
import TeamProfileScreen from "../screens/TeamProfileScreen";
import EditTeamProfileScreen from "../screens/EditTeamProfileScreen";
import MainTournamentScreen from "../screens/MainTournamentScreen";
import UpcomingEventScreen from "../screens/UpcomingEventScreen";
import CreateEventScreen from "../screens/CreateEventScreen";
import EventScreen from "../screens/EventScreen";
import RegisterForEventScreen from "../screens/RegisterForEventScreen";
import RegistrationScreen from "../screens/RegistrationScreen";

const EventNavigation = createStackNavigator(
  {
    MainTournamentScreen,
    UpcomingEventScreen,
    CreateEventScreen,
    EventScreen,
    RegisterForEventScreen,
    RegistrationScreen,
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
