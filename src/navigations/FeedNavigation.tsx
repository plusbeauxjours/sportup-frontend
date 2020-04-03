import { createStackNavigator } from "react-navigation-stack";
import { PRIMARY_COLOR } from "../constants/colors";
import Feed from "../screens/Feed";
import UserProfile from "../screens/UserProfile";

const FeedStack = createStackNavigator(
  {
    Feed: Feed,
    UserProfile: UserProfile
  },
  {
    initialRouteName: "Feed",
    navigationOptions: {
      headerStyle: {
        backgroundColor: PRIMARY_COLOR
      },
      headerTintColor: "#fff"
    }
  }
);

export default FeedStack;
