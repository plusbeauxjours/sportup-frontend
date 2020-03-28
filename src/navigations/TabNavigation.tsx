import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import MyProfileNavigation from "../navigations/MyProfileNavigation";
import { Icon } from "react-native-elements";

const MainDrawer = createDrawerNavigator(
  {
    MyProfile: {
      screen: MyProfileNavigation,

      navigationOptions: {
        drawerLabel: "Me",
        drawerIcon: ({ tintColor }) => <Icon name="person" color={tintColor} />
      }
    }
  },
  {
    initialRouteName: "MyProfile"
  }
);

export default MainDrawer;
