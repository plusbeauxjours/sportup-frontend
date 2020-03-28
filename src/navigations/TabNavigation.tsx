import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation";
import { Icon } from "react-native-elements";

const stackFactory = initialRoute =>
  createStackNavigator({
    InitialRoute: {
      screen: initialRoute,
      navigationOptions: {
        header: null
      }
    }
  });

const MainDrawer = createDrawerNavigator(
  {
    MyProfile: {
      screen: MyProfileStack,
      navigationOptions: {
        drawerLabel: "Me",
        drawerIcon: ({ tintColor }) => <Icon name="person" color={tintColor} />
      }
    },
    Feed: {
      screen: FeedStack,
      navigationOptions: {
        drawerLabel: "Feed",
        drawerIcon: ({ tintColor }) => (
          <Icon name="timeline" color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "MyProfile"
  }
);

export default MainDrawer;
