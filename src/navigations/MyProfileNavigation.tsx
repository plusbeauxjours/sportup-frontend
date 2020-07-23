import { createStackNavigator } from "react-navigation-stack";

import MyProfileScreen from "../screens/MyProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import FollowersScreen from "../screens/FollowersScreen";
import FollowingScreen from "../screens/FollowingScreen";
import TeamsScreen from "../screens/TeamsScreen";
import TeamProfileScreen from "../screens/TeamProfileScreen";
import CreateTeamScreen from "../screens/CreateTeamScreen";
import EditTeamProfileScreen from "../screens/EditTeamProfileScreen";
import EditSportsScreen from "../screens/EditSportsScreen";
import ChatSendLocationScreen from "../screens/ChatSendLocationScreen";
import ChatScreen from "../screens/ChatScreen/";

const MyProfileNavigation = createStackNavigator(
  {
    MyProfileScreen,
    EditProfileScreen,
    UserProfileScreen,
    FollowersScreen,
    FollowingScreen,
    TeamsScreen,
    TeamProfileScreen,
    CreateTeamScreen,
    EditTeamProfileScreen,
    EditSportsScreen,
    ChatSendLocationScreen,
    ChatScreen,
  },
  { initialRouteName: "MyProfileScreen" }
);

export default MyProfileNavigation;
