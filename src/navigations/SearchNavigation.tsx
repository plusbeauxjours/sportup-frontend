import { createStackNavigator } from "react-navigation-stack";

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
import ChatSendLocationScreen from "../screens/ChatSendLocationScreen";
import ChatScreen from "../screens/ChatScreen/";

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
    ChatSendLocationScreen,
    ChatScreen,
  },
  { initialRouteName: "SearchScreen" }
);

export default SearchNavigation;
