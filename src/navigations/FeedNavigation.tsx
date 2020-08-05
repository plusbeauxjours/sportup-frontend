import React, { useEffect } from "react";
import { Appbar } from "react-native-paper";
import { useApolloClient } from "react-apollo-hooks";
import { AsyncStorage } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import FeedScreen from "../screens/FeedScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import FollowersScreen from "../screens/FollowersScreen";
import FollowingScreen from "../screens/FollowingScreen";
import TeamsScreen from "../screens/TeamsScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import TeamProfileScreen from "../screens/TeamProfileScreen";
import EditTeamProfileScreen from "../screens/EditTeamProfileScreen";
import ChatSendLocationScreen from "../screens/ChatSendLocationScreen";
import ChatScreen from "../screens/ChatScreen/";
import WritePostScreen from "../screens/WritePostScreen/index";
import EditSportsScreen from "../screens/EditSportsScreen/EditSportsScreen";
import CreateTeamScreen from "../screens/CreateTeamScreen/CreateTeamScreen";
import BackBtn from "../components/BackBtn";

const FeedNavigation = createStackNavigator();

export default ({ navigation }) => {
  const client = useApolloClient();
  const handleLogout = async () => {
    client.resetStore();
    await AsyncStorage.clear();
    navigation.navigate("Auth");
  };
  useEffect(() => {
    navigation.setParams({
      logout: handleLogout,
    });
  }, []);
  return (
    <FeedNavigation.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackImage: () => <BackBtn />,
      }}
    >
      <FeedNavigation.Screen
        name="FeedScreen"
        component={FeedScreen}
        options={{
          title: "Feed",
          headerLeft: () => (
            <Appbar.Action
              icon="menu"
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          ),
        }}
      />
      <FeedNavigation.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
        options={{
          title: "Me",
          headerRight: () => (
            // <>
            <Appbar.Action
              icon="square-edit-outline"
              onPress={() => {
                navigation.navigate("EditProfileScreen");
              }}
            />
            // <Appbar.Action
            //   icon="exit-to-app"
            //   onPress={navigation.getParam("logout")}
            // />
            // </>
          ),
        }}
      />
      <FeedNavigation.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
      <FeedNavigation.Screen
        name="WritePostScreen"
        component={WritePostScreen}
        options={{ title: "Write Post" }}
      />
      <FeedNavigation.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ title: "User Profile" }}
      />
      <FeedNavigation.Screen
        name="FollowersScreen"
        component={FollowersScreen}
        options={{ title: "Followers" }}
      />
      <FeedNavigation.Screen
        name="FollowingScreen"
        component={FollowingScreen}
        options={{ title: "Following" }}
      />
      <FeedNavigation.Screen
        name="TeamsScreen"
        component={TeamsScreen}
        options={{ title: "Teams" }}
      />
      <FeedNavigation.Screen
        name="TeamProfileScreen"
        component={TeamProfileScreen}
        options={{ title: "Team Profile" }}
      />
      <FeedNavigation.Screen
        name="CreateTeamScreen"
        component={CreateTeamScreen}
        options={{ title: "Create Team" }}
      />
      <FeedNavigation.Screen
        name="EditTeamProfileScreen"
        component={EditTeamProfileScreen}
        options={{ title: "Edit Team Profile" }}
      />
      <FeedNavigation.Screen
        name="EditSportsScreen"
        component={EditSportsScreen}
        options={{ title: "Edit Sports" }}
      />
      <FeedNavigation.Screen
        name="ChatSendLocationScreen"
        component={ChatSendLocationScreen}
      />
      <FeedNavigation.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ title: "Chat" }}
      />
    </FeedNavigation.Navigator>
  );
};
