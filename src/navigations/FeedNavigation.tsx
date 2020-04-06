import { createStackNavigator } from "react-navigation-stack";
import { PRIMARY_COLOR } from "../constants/colors";

import Feed from "../screens/Feed";
import UserProfile from "../screens/UserProfile";
import Followers from "../screens/Followers";
import Following from "../screens/Following/index";
import Teams from "../screens/Teams/Teams";
import MyProfile from "../screens/MyProfile";
import EditProfile from "../screens/EditProfile";

const FeedStack = createStackNavigator(
  {
    Feed: Feed,
    MyProfile: MyProfile,
    EditProfile: EditProfile,
    UserProfile: UserProfile,
    Followers: Followers,
    Following: Following,
    Teams: Teams
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
