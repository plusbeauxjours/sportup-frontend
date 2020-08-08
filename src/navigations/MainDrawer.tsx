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
  <Drawer.Navigator
    initialRouteName="Me"
    drawerStyle={{ backgroundColor: "#ffae19" }}
    drawerContentOptions={{ labelStyle: { color: "#FFF" } }}
  >
    <Drawer.Screen name="Me" component={MyProfileNavigation} />
    <Drawer.Screen name="Feed" component={FeedNavigation} />
    <Drawer.Screen name="Find" component={FindNavigation} />
    <Drawer.Screen name="Chat" component={ChatNavigation} />
    <Drawer.Screen name="Events" component={EventNavigation} />
    <Drawer.Screen name="Search" component={SearchNavigation} />
  </Drawer.Navigator>
);
