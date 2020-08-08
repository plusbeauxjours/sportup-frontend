import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

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
import { DARK_ORANGE } from "../constants/colors";
import {
  RigthComponent,
  LeftComponent,
} from "../components/MyprofileCustomHeader";

const MyProfileNavigation = createStackNavigator();

export default () => {
  return (
    <MyProfileNavigation.Navigator
      initialRouteName="MyProfileScreen"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: DARK_ORANGE,
        headerBackImage: () => <BackBtn />,
      }}
    >
      <MyProfileNavigation.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
        options={{
          title: "Me",
          headerLeft: () => <LeftComponent />,
          headerRight: () => <RigthComponent />,
        }}
      />
      <MyProfileNavigation.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
      <MyProfileNavigation.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ title: "User Profile" }}
      />
      <MyProfileNavigation.Screen
        name="FollowersScreen"
        component={FollowersScreen}
        options={{ title: "Followers" }}
      />
      <MyProfileNavigation.Screen
        name="FollowingScreen"
        component={FollowingScreen}
        options={{ title: "Following" }}
      />
      <MyProfileNavigation.Screen
        name="TeamsScreen"
        component={TeamsScreen}
        options={{ title: "Teams" }}
      />
      <MyProfileNavigation.Screen
        name="TeamProfileScreen"
        component={TeamProfileScreen}
        options={{ title: "Team Profile" }}
      />
      <MyProfileNavigation.Screen
        name="CreateTeamScreen"
        component={CreateTeamScreen}
        options={{ title: "Create Team" }}
      />
      <MyProfileNavigation.Screen
        name="EditTeamProfileScreen"
        component={EditTeamProfileScreen}
        options={{ title: "EditTeam Profile" }}
      />
      <MyProfileNavigation.Screen
        name="EditSportsScreen"
        component={EditSportsScreen}
        options={{ title: "Edit Sports" }}
      />
      <MyProfileNavigation.Screen
        name="ChatSendLocationScreen"
        component={ChatSendLocationScreen}
      />
      <MyProfileNavigation.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ title: "Chat" }}
      />
    </MyProfileNavigation.Navigator>
  );
};
