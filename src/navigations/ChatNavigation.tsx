import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ChatListScreen from "../screens/ChatListScreen";
import ChatSendLocationScreen from "../screens/ChatSendLocationScreen";
import ChatScreen from "../screens/ChatScreen";
import UserProfileScreen from "../screens/UserProfileScreen/UserProfileScreen";
import FollowersScreen from "../screens/FollowersScreen/FollowersScreen";
import FollowingScreen from "../screens/FollowingScreen/FollowingScreen";
import TeamsScreen from "../screens/TeamsScreen/TeamsScreen";
import TeamProfileScreen from "../screens/TeamProfileScreen/TeamProfileScreen";
import BackBtn from "../components/BackBtn";
import MyProfileScreen from "../screens/MyProfileScreen/MyProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen/EditProfileScreen";
import FoundPlayersListScreen from "../screens/FoundPlayersListScreen/FoundPlayersListScreen";
import FoundTeamsListScreen from "../screens/FoundTeamsListScreen/FoundTeamsListScreen";
import CreateTeamScreen from "../screens/CreateTeamScreen/CreateTeamScreen";
import EditTeamProfileScreen from "../screens/EditTeamProfileScreen/EditTeamProfileScreen";
import EditSportsScreen from "../screens/EditSportsScreen/EditSportsScreen";
import { DARK_ORANGE } from "../constants/colors";
import {
  LeftComponent,
  RigthComponent,
} from "../components/MyprofileCustomHeader";

const ChatNavigation = createStackNavigator();

export default () => {
  return (
    <ChatNavigation.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: DARK_ORANGE,
        headerBackImage: () => <BackBtn />,
      }}
    >
      <ChatNavigation.Screen
        name="ChatListScreen"
        component={ChatListScreen}
        options={{
          title: "Chat",
          headerLeft: () => <LeftComponent />,
        }}
      />
      <ChatNavigation.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
        options={{
          title: "Me",
          headerRight: () => <RigthComponent />,
        }}
      />
      <ChatNavigation.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
      <ChatNavigation.Screen
        name="FoundPlayersListScreen"
        component={FoundPlayersListScreen}
        options={{ title: "Found Player" }}
      />
      <ChatNavigation.Screen
        name="FoundTeamsListScreen"
        component={FoundTeamsListScreen}
        options={{ title: "Found Team" }}
      />
      <ChatNavigation.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ title: "User Profile" }}
      />
      <ChatNavigation.Screen
        name="FollowersScreen"
        component={FollowersScreen}
        options={{ title: "Followers" }}
      />
      <ChatNavigation.Screen
        name="FollowingScreen"
        component={FollowingScreen}
        options={{ title: "Following" }}
      />
      <ChatNavigation.Screen
        name="TeamsScreen"
        component={TeamsScreen}
        options={{ title: "Teams" }}
      />
      <ChatNavigation.Screen
        name="TeamProfileScreen"
        component={TeamProfileScreen}
        options={{ title: "Team Profile" }}
      />
      <ChatNavigation.Screen
        name="CreateTeamScreen"
        component={CreateTeamScreen}
        options={{ title: "Create Team" }}
      />
      <ChatNavigation.Screen
        name="EditTeamProfileScreen"
        component={EditTeamProfileScreen}
        options={{ title: "Edit Team Profile" }}
      />
      <ChatNavigation.Screen
        name="EditSportsScreen"
        component={EditSportsScreen}
        options={{ title: "Edit Sports" }}
      />
      <ChatNavigation.Screen
        name="ChatSendLocationScreen"
        component={ChatSendLocationScreen}
      />
      <ChatNavigation.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ title: "Chat" }}
      />
    </ChatNavigation.Navigator>
  );
};
