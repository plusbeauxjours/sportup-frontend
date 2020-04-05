import { createStackNavigator } from "react-navigation-stack";
import { PRIMARY_COLOR } from "../constants/colors";
import Feed from "../screens/Feed";
import UserProfile from "../screens/UserProfile";
import Followers from "../screens/Followers";
import Following from "../screens/Following/index";

const FeedStack = createStackNavigator(
  {
    Feed: Feed,
    UserProfile: UserProfile,
    Followers: Followers,
    Following: Following
  },
  {
    initialRouteName: "Following",
    navigationOptions: {
      headerStyle: {
        backgroundColor: PRIMARY_COLOR
      },
      headerTintColor: "#fff"
    }
  }
);

export default FeedStack;
