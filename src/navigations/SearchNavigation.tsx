import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserProfileScreen from "../screens/UserProfileScreen";
import FollowersScreen from "../screens/FollowersScreen";
import FollowingScreen from "../screens/FollowingScreen";
import TeamsScreen from "../screens/TeamsScreen";
import TeamProfileScreen from "../screens/TeamProfileScreen";
import EditTeamProfileScreen from "../screens/EditTeamProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import EventScreen from "../screens/EventScreen/EventScreen";
import RegisterForEventScreen from "../screens/RegisterForEventScreen/RegisterForEventScreen";
import RegistrationScreen from "../screens/RegistrationScreen/index";
import ChatSendLocationScreen from "../screens/ChatSendLocationScreen";
import ChatScreen from "../screens/ChatScreen/";
import BackBtn from "../components/BackBtn";
import EditSportsScreen from "../screens/EditSportsScreen/EditSportsScreen";
import CreateTeamScreen from "../screens/CreateTeamScreen/CreateTeamScreen";
import MyProfileScreen from "../screens/MyProfileScreen/MyProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen/EditProfileScreen";
import CreateEventScreen from "../screens/CreateEventScreen/CreateEventScreen";
import {
  LeftComponent,
  RigthComponent,
} from "../components/MyprofileCustomHeader";

const SearchNavigation = createStackNavigator();

export default () => {
  return (
    <SearchNavigation.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackImage: () => <BackBtn />,
      }}
    >
      <SearchNavigation.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: "Play",
          headerLeft: () => <LeftComponent />,
        }}
      />
      <SearchNavigation.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
        options={{
          title: "Me",
          headerRight: () => <RigthComponent />,
        }}
      />
      <SearchNavigation.Screen
        name="EventScreen"
        component={EventScreen}
        options={{ title: "Edit Profile" }}
      />
      <SearchNavigation.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
      <SearchNavigation.Screen
        name="RegisterForEventScreen"
        component={RegisterForEventScreen}
        options={{ title: "Register for Event" }}
      />
      <SearchNavigation.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{ title: "Registratiton" }}
      />
      <SearchNavigation.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ title: "User Profile" }}
      />
      <SearchNavigation.Screen
        name="FollowersScreen"
        component={FollowersScreen}
        options={{ title: "Followers" }}
      />
      <SearchNavigation.Screen
        name="FollowingScreen"
        component={FollowingScreen}
        options={{ title: "Following" }}
      />
      <SearchNavigation.Screen
        name="TeamsScreen"
        component={TeamsScreen}
        options={{ title: "Teams" }}
      />
      <SearchNavigation.Screen
        name="TeamProfileScreen"
        component={TeamProfileScreen}
        options={{ title: "Team Profile" }}
      />
      <SearchNavigation.Screen
        name="CreateTeamScreen"
        component={CreateTeamScreen}
        options={{ title: "Create Team" }}
      />
      <SearchNavigation.Screen
        name="EditTeamProfileScreen"
        component={EditTeamProfileScreen}
        options={{ title: "Edit Team Profile" }}
      />
      <SearchNavigation.Screen
        name="EditSportsScreen"
        component={EditSportsScreen}
        options={{ title: "Edit Sports" }}
      />
      <SearchNavigation.Screen
        name="ChatSendLocationScreen"
        component={ChatSendLocationScreen}
      />
      <SearchNavigation.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ title: "Chat" }}
      />
    </SearchNavigation.Navigator>
  );
};
