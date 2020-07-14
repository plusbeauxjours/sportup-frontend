import { createStackNavigator } from "react-navigation-stack";
import { PRIMARY_COLOR } from "../constants/colors";
import ChatListScreen from "../screens/ChatListScreen/ChatListScreen";

const CharNavigation = createStackNavigator(
  {
    ChatListScreen,
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
export default CharNavigation;
