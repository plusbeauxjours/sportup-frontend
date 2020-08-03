import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import MyProfileNavigation from "./MyProfileNavigation";
import FeedNavigation from "./FeedNavigation";
import FindNavigation from "./FindNavigation";
import EventNavigation from "./EventNavigation";
import SearchNavigation from "./SearchNavigation";
import ChatNavigation from "./ChatNavigation";
import { Icon, Avatar } from "react-native-elements";

import { FlatList } from "react-native";
import { NO_AVATAR_THUMBNAIL } from "../constants/urls";
import styled from "styled-components/native";
import { withNavigation } from "react-navigation";
import { useMe } from "../context/meContext";

const Title = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-left: 30px;
`;

const ListItem = styled.TouchableOpacity`
  margin-left: 20px;
  height: 50px;
  align-items: center;
  flex-direction: row;
`;

const Container = styled.View`
  background-color: white;
  padding-top: 40px;
  align-items: center;
  flex: 1;
`;

const SidebarDivider = styled.View`
  height: 1px;
  width: 100%;
  background-color: lightgray;
  margin: 10px 0;
`;

const Name = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-top: 10px;
`;
const Username = styled.Text`
  color: gray;
  margin-bottom: 10px;
`;

const Item = withNavigation(({ item, navigation }) => {
  return (
    <ListItem onPress={() => navigation.navigate(item.name)}>
      <Icon name={item.icon} size={20} />
      <Title>{item.name}</Title>
    </ListItem>
  );
});

const Sidebar = () => {
  const { me } = useMe();
  const routes = [
    {
      name: "Me",
      icon: "person",
    },
    {
      name: "Feed",
      icon: "timeline",
    },
    {
      name: "Find",
      icon: "games",
    },
    {
      name: "Chat",
      icon: "chat",
    },
    {
      name: "Events",
      icon: "event",
    },
    {
      name: "Search",
      icon: "search",
    },
  ];
  return (
    <Container>
      <Avatar
        size="large"
        rounded
        containerStyle={{ marginTop: 40 }}
        source={{
          uri: NO_AVATAR_THUMBNAIL,
        }}
      />
      <Name>{me?.user.name}</Name>
      <Username>@{me?.user.username}</Username>
      <SidebarDivider />
      <FlatList
        style={{ width: "100%", marginLeft: 30 }}
        data={routes}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.name}
        scrollEnabled={false}
      />
    </Container>
  );
};

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
