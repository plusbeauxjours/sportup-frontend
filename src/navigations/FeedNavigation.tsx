import { createStackNavigator } from "react-navigation-stack";

import FeedScreen from "../screens/FeedScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import FollowersScreen from "../screens/FollowersScreen";
import FollowingScreen from "../screens/FollowingScreen";
import TeamsScreen from "../screens/TeamsScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import TeamProfileScreen from "../screens/TeamProfileScreen";
import EditTeamProfileScreen from "../screens/EditTeamProfileScreen";
import ChatSendLocationScreen from "../screens/ChatSendLocationScreen";
import ChatScreen from "../screens/ChatScreen/";
import WritePostScreen from "../screens/WritePostScreen/index";

const FeedNavigation = createStackNavigator(
  {
    FeedScreen,
    WritePostScreen,
    MyProfileScreen,
    EditProfileScreen,
    UserProfileScreen,
    FollowersScreen,
    FollowingScreen,
    TeamsScreen,
    TeamProfileScreen,
    EditTeamProfileScreen,
    ChatSendLocationScreen,
    ChatScreen,
  },
  { initialRouteName: "FeedScreen" }
);

export default FeedNavigation;
