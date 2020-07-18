import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import MyProfileNavigation from "./MyProfileNavigation";
import FeedNavigation from "./FeedNavigation";
import FindNavigation from "./FindNavigation";
import EventNavigation from "./EventNavigation";
import SearchNavigation from "./SearchNavigation";
import ChatNavigation from "./ChatNavigation";
import { Icon } from "react-native-elements";

import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NO_AVATAR_THUMBNAIL } from "../constants/urls";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 40,
    alignItems: "center",
    flex: 1,
  },
  listItem: {
    height: 60,
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    marginLeft: 20,
  },
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 20,
  },
  sidebarDivider: {
    height: 1,
    width: "100%",
    backgroundColor: "lightgray",
    marginVertical: 10,
  },
});

function Item({ item, navigate }) {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigate(item.name)}
    >
      <Ionicons name={item.icon} size={32} />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
}

class Sidebar extends React.Component {
  state = {
    routes: [
      {
        name: "Home",
        icon: "ios-home",
      },
      {
        name: "Profile",
        icon: "ios-contact",
      },
      {
        name: "Settings",
        icon: "ios-settings",
      },
    ],
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: NO_AVATAR_THUMBNAIL }}
          style={styles.profileImg}
        />
        <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 10 }}>
          Janna Doe
        </Text>
        <Text style={{ color: "gray", marginBottom: 10 }}>janna@doe.com</Text>
        <View style={styles.sidebarDivider}></View>
        <FlatList
          style={{ width: "100%", marginLeft: 30 }}
          data={this.state.routes}
          renderItem={({ item }) => (
            <Item item={item} navigate={this.props.navigation.navigate} />
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
    );
  }
}

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
    Find: {
      screen: FindNavigation,
      navigationOptions: {
        drawerLabel: "Play",
        drawerIcon: ({ tintColor }) => <Icon name="games" color={tintColor} />,
      },
    },
    Chat: {
      screen: ChatNavigation,
      navigationOptions: {
        drawerLabel: "Chat",
        drawerIcon: ({ tintColor }) => <Icon name="chat" color={tintColor} />,
      },
    },
    Events: {
      screen: EventNavigation,
      navigationOptions: {
        drawerLabel: "Events",
        drawerIcon: ({ tintColor }) => <Icon name="event" color={tintColor} />,
      },
    },
    Search: {
      screen: SearchNavigation,
      navigationOptions: {
        drawerLabel: "Search",
        drawerIcon: ({ tintColor }) => <Icon name="search" color={tintColor} />,
      },
    },
  },
  {
    initialRouteName: "Me",
    unmountInactiveRoutes: true,
    contentComponent: (props) => <Sidebar {...props} />,
  }
);

export default MainDrawer;
