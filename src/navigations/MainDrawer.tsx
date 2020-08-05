import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MyProfileNavigation from "./MyProfileNavigation";
import FeedNavigation from "./FeedNavigation";
import FindNavigation from "./FindNavigation";
import EventNavigation from "./EventNavigation";
import SearchNavigation from "./SearchNavigation";
import ChatNavigation from "./ChatNavigation";

const Drawer = createDrawerNavigator();
export default () => (
  <Drawer.Navigator>
    <Drawer.Screen
      name="Me"
      component={MyProfileNavigation}
      options={{ drawerLabel: "Me" }}
    />
    <Drawer.Screen
      name="Feed"
      component={FeedNavigation}
      // options={{ drawerLabel: "Feed" }}
    />
    <Drawer.Screen
      name="Find"
      component={FindNavigation}
      // options={{ drawerLabel: "Find" }}
    />
    <Drawer.Screen
      name="Chat"
      component={ChatNavigation}
      // options={{ drawerLabel: "Chat" }}
    />
    <Drawer.Screen
      name="Events"
      component={EventNavigation}
      // options={{ drawerLabel: "Events" }}
    />
    <Drawer.Screen
      name="Search"
      component={SearchNavigation}
      // options={{ drawerLabel: "Search" }}
    />
  </Drawer.Navigator>
);
