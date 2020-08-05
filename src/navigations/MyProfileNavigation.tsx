import React from "react";
import { Appbar } from "react-native-paper";
import { useApolloClient } from "react-apollo-hooks";
import { AsyncStorage } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import styled from "styled-components/native";

import MyProfileScreen from "../screens/MyProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import FollowersScreen from "../screens/FollowersScreen";
import FollowingScreen from "../screens/FollowingScreen";
import TeamsScreen from "../screens/TeamsScreen";
import TeamProfileScreen from "../screens/TeamProfileScreen";
import CreateTeamScreen from "../screens/CreateTeamScreen";
import EditTeamProfileScreen from "../screens/EditTeamProfileScreen";
import EditSportsScreen from "../screens/EditSportsScreen";
import ChatSendLocationScreen from "../screens/ChatSendLocationScreen";
import ChatScreen from "../screens/ChatScreen/";
import BackBtn from "../components/BackBtn";

const Row = styled.View`
  flex-direction: row;
`;

const MyProfileNavigation = createStackNavigator();

export default () => {
  const client = useApolloClient();
  const navigation = useNavigation();
  const handleLogout = async () => {
    client.resetStore();
    await AsyncStorage.clear();
    navigation.navigate("Auth");
  };
  return (
    <MyProfileNavigation.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackImage: () => <BackBtn />,
      }}
    >
      <MyProfileNavigation.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
        options={{
          title: "Me",
          headerLeft: () => (
            <Appbar.Action
              icon="menu"
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          ),
          headerRight: () => (
            <Row>
              <Appbar.Action
                icon="square-edit-outline"
                onPress={() => {
                  navigation.navigate("EditProfileScreen");
                }}
              />
              <Appbar.Action
                icon="exit-to-app"
                onPress={() => handleLogout()}
              />
            </Row>
          ),
        }}
      />
      <MyProfileNavigation.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ title: "EditProfileScreen" }}
      />
      <MyProfileNavigation.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ title: "UserProfileScreen" }}
      />
      <MyProfileNavigation.Screen
        name="FollowersScreen"
        component={FollowersScreen}
        options={{ title: "FollowersScreen" }}
      />
      <MyProfileNavigation.Screen
        name="FollowingScreen"
        component={FollowingScreen}
        options={{ title: "FollowingScreen" }}
      />
      <MyProfileNavigation.Screen
        name="TeamsScreen"
        component={TeamsScreen}
        options={{ title: "TeamsScreen" }}
      />
      <MyProfileNavigation.Screen
        name="TeamProfileScreen"
        component={TeamProfileScreen}
        options={{ title: "TeamProfileScreen" }}
      />
      <MyProfileNavigation.Screen
        name="CreateTeamScreen"
        component={CreateTeamScreen}
        options={{ title: "CreateTeamScreen" }}
      />
      <MyProfileNavigation.Screen
        name="EditTeamProfileScreen"
        component={EditTeamProfileScreen}
        options={{ title: "EditTeamProfileScreen" }}
      />
      <MyProfileNavigation.Screen
        name="EditSportsScreen"
        component={EditSportsScreen}
        options={{ title: "EditSportsScreen" }}
      />
      <MyProfileNavigation.Screen
        name="ChatSendLocationScreen"
        component={ChatSendLocationScreen}
        options={{ title: "ChatSendLocationScreen" }}
      />
      <MyProfileNavigation.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ title: "ChatScreen" }}
      />
    </MyProfileNavigation.Navigator>
  );
};
