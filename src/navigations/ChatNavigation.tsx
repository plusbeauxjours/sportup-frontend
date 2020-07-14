import { createStackNavigator } from "react-navigation-stack";
import { PRIMARY_COLOR } from "../constants/colors";
import ChatListScreen from "../screens/ChatListScreen";
import ChatSendLocationScreen from "../screens/ChatSendLocationScreen";
import ChatScreen from "../screens/ChatScreen";

const ChatNavigation = createStackNavigator(
  {
    ChatListScreen,
    ChatSendLocationScreen,
    ChatScreen,
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
