import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import MyProfileNavigation from "./MyProfileNavigation";
import FeedNavigation from "./FeedNavigation";
import FindNavigation from "./FindNavigation";
import EventNavigation from "./EventNavigation";
import SearchNavigation from "./SearchNavigation";
// import ChatNavigation from "./ChatNavigation";
import { Icon } from "react-native-elements";

const MainDrawer = createDrawerNavigator(
  {
    Me: {
      screen: MyProfileNavigation,
      navigationOptions: {
        drawerLabel: "Me",
        drawerIcon: ({ tintColor }) => <Icon name="person" color={tintColor} />,
      },
    },
    Feed: {
      screen: FeedNavigation,
      navigationOptions: {
        drawerLabel: "Feed",
        drawerIcon: ({ tintColor }) => (
          <Icon name="timeline" color={tintColor} />
        ),
      },
    },
    // Find: {
    //   screen: FindNavigation,
    //   navigationOptions: {
    //     drawerLabel: "Play",
    //     drawerIcon: ({ tintColor }) => <Icon name="games" color={tintColor} />,
    //   },
    // },
    // Chat: {
    //   screen: ChatNavigation,
    //   navigationOptions: {
    //     drawerLabel: "Chat",
    //     drawerIcon: ({ tintColor }) => <Icon name="chat" color={tintColor} />,
    //   },
    // },
    // Events: {
    //   screen: EventNavigation,
    //   navigationOptions: {
    //     drawerLabel: "Events",
    //     drawerIcon: ({ tintColor }) => <Icon name="event" color={tintColor} />,
    //   },
    // },
    // Search: {
    //   screen: SearchNavigation,
    //   navigationOptions: {
    //     drawerLabel: "Search",
    //     drawerIcon: ({ tintColor }) => <Icon name="search" color={tintColor} />,
    //   },
    // },
  },
  {
    initialRouteName: "Me",
  }
);

export default MainDrawer;
