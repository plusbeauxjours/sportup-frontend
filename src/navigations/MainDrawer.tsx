import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import MyProfileNavigation from "./MyProfileNavigation";
import FeedNavigation from "./FeedNavigation";
import FindNavigation from "./FindNavigation";
import EventNavigation from "./EventNavigation";
import SearchNavigation from "./SearchNavigation";
import ChatNavigation from "./ChatNavigation";
import { useNavigation } from "@react-navigation/native";
import { Icon, Avatar } from "react-native-elements";
import { useMe } from "../context/meContext";
import { NO_AVATAR_THUMBNAIL } from "../constants/urls";
import { FlatList } from "react-native";
import styled from "styled-components/native";

const Title = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-left: 30px;
  color: white;
`;

const ListItem = styled.TouchableOpacity`
  margin-left: 10px;
  height: 50px;
  align-items: center;
  flex-direction: row;
`;

const Container = styled.View`
  background-color: transparent;
  padding-top: 40px;
  align-items: center;
  flex: 1;
`;

const SidebarDivider = styled.View`
  border-bottom-width: 0.5px;
  border-color: white;
  width: 100%;
  margin: 10px 0;
`;

const Name = styled.Text`
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;
  color: white;
`;
const Username = styled.Text`
  margin-bottom: 10px;
  color: white;
`;

const Item = ({ item }) => {
  const navigation = useNavigation();
  return (
    <ListItem onPress={() => navigation.navigate(item.name)}>
      <Icon name={item.icon} size={20} color={"#fff"} />
      <Title>{item.name}</Title>
    </ListItem>
  );
};

const CustomDrawerContent = (props) => {
  const { me, loading: meLoading } = useMe();
  const navigation = useNavigation();
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
  if (!meLoading) {
    return (
      <DrawerContentScrollView {...props}>
        <Container>
          <Avatar
            size="large"
            rounded
            containerStyle={{ borderColor: "white", borderWidth: 2 }}
            source={{
              uri: NO_AVATAR_THUMBNAIL,
            }}
          />
          <Name>{me?.user.name}</Name>
          <Username>@{me?.user.username}</Username>
        </Container>
        <SidebarDivider />
        <FlatList
          style={{ width: "100%", marginLeft: 30 }}
          data={routes}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.name}
          scrollEnabled={false}
        />
      </DrawerContentScrollView>
    );
  } else {
    return null;
  }
};

const Drawer = createDrawerNavigator();
export default () => (
  <Drawer.Navigator
    initialRouteName="Me"
    drawerContent={(props) => <CustomDrawerContent {...props} />}
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
