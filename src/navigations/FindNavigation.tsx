import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserProfileScreen from "../screens/UserProfileScreen";
import FollowersScreen from "../screens/FollowersScreen";
import FollowingScreen from "../screens/FollowingScreen";
import TeamsScreen from "../screens/TeamsScreen";
import TeamProfileScreen from "../screens/TeamProfileScreen";
import FindPlayerScreen from "../screens/FindPlayerScreen";
import FoundPlayersListScreen from "../screens/FoundPlayersListScreen/FoundPlayersListScreen";
import FoundTeamsListScreen from "../screens/FoundTeamsListScreen/index";
import ChatSendLocationScreen from "../screens/ChatSendLocationScreen";
import ChatScreen from "../screens/ChatScreen/";
import BackBtn from "../components/BackBtn";
import MyProfileScreen from "../screens/MyProfileScreen/MyProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen/EditProfileScreen";
import CreateTeamScreen from "../screens/CreateTeamScreen/CreateTeamScreen";
import EditTeamProfileScreen from "../screens/EditTeamProfileScreen/EditTeamProfileScreen";
import EditSportsScreen from "../screens/EditSportsScreen/EditSportsScreen";
import { DARK_ORANGE } from "../constants/colors";
import {
  LeftComponent,
  RigthComponent,
} from "../components/MyprofileCustomHeader";

const FindNavigation = createStackNavigator();

export default () => {
  return (
    <FindNavigation.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: DARK_ORANGE,
        headerBackImage: () => <BackBtn />,
      }}
    >
      <FindNavigation.Screen
        name="FindPlayerScreen"
        component={FindPlayerScreen}
        options={{
          title: "Play",
          headerLeft: () => <LeftComponent />,
        }}
      />
      <FindNavigation.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
        options={{
          title: "Me",
          headerRight: () => <RigthComponent />,
        }}
      />
      <FindNavigation.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
      <FindNavigation.Screen
        name="FoundPlayersListScreen"
        component={FoundPlayersListScreen}
        options={{ title: "Found Player" }}
      />
      <FindNavigation.Screen
        name="FoundTeamsListScreen"
        component={FoundTeamsListScreen}
        options={{ title: "Found Team" }}
      />
      <FindNavigation.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ title: "User Profile" }}
      />
      <FindNavigation.Screen
        name="FollowersScreen"
        component={FollowersScreen}
        options={{ title: "Followers" }}
      />
      <FindNavigation.Screen
        name="FollowingScreen"
        component={FollowingScreen}
        options={{ title: "Following" }}
      />
      <FindNavigation.Screen
        name="TeamsScreen"
        component={TeamsScreen}
        options={{ title: "Teams" }}
      />
      <FindNavigation.Screen
        name="TeamProfileScreen"
        component={TeamProfileScreen}
        options={{ title: "Team Profile" }}
      />
      <FindNavigation.Screen
        name="CreateTeamScreen"
        component={CreateTeamScreen}
        options={{ title: "Create Team" }}
      />
      <FindNavigation.Screen
        name="EditTeamProfileScreen"
        component={EditTeamProfileScreen}
        options={{ title: "Edit Team Profile" }}
      />
      <FindNavigation.Screen
        name="EditSportsScreen"
        component={EditSportsScreen}
        options={{ title: "Edit Sports" }}
      />
      <FindNavigation.Screen
        name="ChatSendLocationScreen"
        component={ChatSendLocationScreen}
      />
      <FindNavigation.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ title: "Chat" }}
      />
    </FindNavigation.Navigator>
  );
};
