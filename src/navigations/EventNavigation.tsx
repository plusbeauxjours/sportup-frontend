import { createStackNavigator } from "react-navigation-stack";

import UserProfileScreen from "../screens/UserProfileScreen";
import FollowersScreen from "../screens/FollowersScreen";
import FollowingScreen from "../screens/FollowingScreen";
import TeamsScreen from "../screens/TeamsScreen";
import TeamProfileScreen from "../screens/TeamProfileScreen";
import EditTeamProfileScreen from "../screens/EditTeamProfileScreen";
import UpcomingEventScreen from "../screens/UpcomingEventScreen";
import CreateEventScreen from "../screens/CreateEventScreen";
import EventScreen from "../screens/EventScreen";
import RegisterForEventScreen from "../screens/RegisterForEventScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import ChatSendLocationScreen from "../screens/ChatSendLocationScreen";
import ChatScreen from "../screens/ChatScreen/";

const EventNavigation = createStackNavigator(
  {
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
    ChatSendLocationScreen,
    ChatScreen,
  },
  { initialRouteName: "UpcomingEventScreen" }
);

export default EventNavigation;
