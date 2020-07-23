import { createStackNavigator } from "react-navigation-stack";

import UserProfileScreen from "../screens/UserProfileScreen";
import FollowersScreen from "../screens/FollowersScreen";
import FollowingScreen from "../screens/FollowingScreen";
import TeamsScreen from "../screens/TeamsScreen";
import TeamProfileScreen from "../screens/TeamProfileScreen";
import FindPlayerScreen from "../screens/FindPlayerScreen";
import FoundPlayersListScreen from "../screens/FoundPlayersListScreen/FoundPlayersListScreen";
import FoundTeamsListScreen from "../screens/FoundTeamsListScreen/index";
import ChatSendLocationScreen from "../screens/ChatSendLocationScreen";
import ChatScreen from "../screens/ChatScreen/";

const FindNavigation = createStackNavigator(
  {
    FindPlayerScreen,
    FoundPlayersListScreen,
    FoundTeamsListScreen,
    UserProfileScreen,
    FollowersScreen,
    FollowingScreen,
    TeamsScreen,
    TeamProfileScreen,
    ChatSendLocationScreen,
    ChatScreen,
  },
  { initialRouteName: "FindPlayerScreen" }
);

export default FindNavigation;
