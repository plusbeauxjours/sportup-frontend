import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserProfileScreen from "../screens/UserProfileScreen";
import FollowersScreen from "../screens/FollowersScreen";
import FollowingScreen from "../screens/FollowingScreen";
import TeamsScreen from "../screens/TeamsScreen";
import TeamProfileScreen from "../screens/TeamProfileScreen";
import EditTeamProfileScreen from "../screens/EditTeamProfileScreen";
import UpcomingEventScreen from "../screens/UpcomingEventScreen";
import CreateEventScreen from "../screens/CreateEventScreen";
import EventScreen from "../screens/EventScreen";
import RegisterForEventScreen from "../screens/RegisterForEventScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import ChatSendLocationScreen from "../screens/ChatSendLocationScreen";
import ChatScreen from "../screens/ChatScreen/";
import MyProfileScreen from "../screens/MyProfileScreen/MyProfileScreen";
import EditSportsScreen from "../screens/EditSportsScreen/EditSportsScreen";
import CreateTeamScreen from "../screens/CreateTeamScreen/CreateTeamScreen";
import EditProfileScreen from "../screens/EditProfileScreen/EditProfileScreen";
import BackBtn from "../components/BackBtn";
import { DARK_ORANGE } from "../constants/colors";
import {
  LeftComponent,
  RigthComponent,
} from "../components/MyprofileCustomHeader";

const EventNavigation = createStackNavigator();

export default () => {
  return (
    <EventNavigation.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: DARK_ORANGE,
        headerBackImage: () => <BackBtn />,
      }}
    >
      <EventNavigation.Screen
        name="UpcomingEventScreen"
        component={UpcomingEventScreen}
        options={{
          title: "Play",
          headerLeft: () => <LeftComponent />,
        }}
      />
      <EventNavigation.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
        options={{
          title: "Me",
          headerRight: () => <RigthComponent />,
        }}
      />
      <EventNavigation.Screen
        name="CreateEventScreen"
        component={CreateEventScreen}
        options={{ title: "Edit Profile" }}
      />
      <EventNavigation.Screen
        name="EventScreen"
        component={EventScreen}
        options={{ title: "Edit Profile" }}
      />
      <EventNavigation.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
      <EventNavigation.Screen
        name="RegisterForEventScreen"
        component={RegisterForEventScreen}
        options={{ title: "Register for Event" }}
      />
      <EventNavigation.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{ title: "Registratiton" }}
      />
      <EventNavigation.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ title: "User Profile" }}
      />
      <EventNavigation.Screen
        name="FollowersScreen"
        component={FollowersScreen}
        options={{ title: "Followers" }}
      />
      <EventNavigation.Screen
        name="FollowingScreen"
        component={FollowingScreen}
        options={{ title: "Following" }}
      />
      <EventNavigation.Screen
        name="TeamsScreen"
        component={TeamsScreen}
        options={{ title: "Teams" }}
      />
      <EventNavigation.Screen
        name="TeamProfileScreen"
        component={TeamProfileScreen}
        options={{ title: "Team Profile" }}
      />
      <EventNavigation.Screen
        name="CreateTeamScreen"
        component={CreateTeamScreen}
        options={{ title: "Create Team" }}
      />
      <EventNavigation.Screen
        name="EditTeamProfileScreen"
        component={EditTeamProfileScreen}
        options={{ title: "Edit Team Profile" }}
      />
      <EventNavigation.Screen
        name="EditSportsScreen"
        component={EditSportsScreen}
        options={{ title: "Edit Sports" }}
      />
      <EventNavigation.Screen
        name="ChatSendLocationScreen"
        component={ChatSendLocationScreen}
      />
      <EventNavigation.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ title: "Chat" }}
      />
    </EventNavigation.Navigator>
  );
};
