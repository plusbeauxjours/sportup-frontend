import { createStackNavigator } from "react-navigation-stack";
import { PRIMARY_COLOR } from "../constants/colors";
import ChatListScreen from "../screens/ChatListScreen";
import ChatSendLocationScreen from "../screens/ChatSendLocationScreen";
import ChatScreen from "../screens/ChatScreen";
import UserProfileScreen from "../screens/UserProfileScreen/UserProfileScreen";
import FollowersScreen from "../screens/FollowersScreen/FollowersScreen";
import FollowingScreen from "../screens/FollowingScreen/FollowingScreen";
import TeamsScreen from "../screens/TeamsScreen/TeamsScreen";
import TeamProfileScreen from "../screens/TeamProfileScreen/TeamProfileScreen";

const ChatNavigation = createStackNavigator(
  {
    ChatListScreen,
    ChatSendLocationScreen,
    ChatScreen,
    UserProfileScreen,
    FollowersScreen,
    FollowingScreen,
    TeamsScreen,
    TeamProfileScreen,
  },
  {
    initialRouteName: "ChatListScreen",
    navigationOptions: {
      headerStyle: {
        backgroundColor: PRIMARY_COLOR,
      },
      headerTintColor: "#fff",
    },
  }
);
export default ChatNavigation;
