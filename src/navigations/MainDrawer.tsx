import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import MyProfileNavigation from "./MyProfileNavigation";
import FeedNavigation from "./FeedNavigation";
import { Icon } from "react-native-elements";

const MainDrawer = createDrawerNavigator(
  {
    MyProfile: {
      screen: MyProfileNavigation,
      navigationOptions: {
        drawerLabel: "Me",
        drawerIcon: ({ tintColor }) => <Icon name="person" color={tintColor} />
      }
    },
    Feed: {
      screen: FeedNavigation,
      navigationOptions: {
        drawerLabel: "Feed",
        drawerIcon: ({ tintColor }) => (
          <Icon name="timeline" color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "Feed"
  }
);

export default MainDrawer;
