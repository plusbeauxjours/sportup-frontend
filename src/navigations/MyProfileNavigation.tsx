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
import {
  RigthComponent,
  LeftComponent,
} from "../components/MyprofileCustomHeader";

const MyProfileNavigation = createStackNavigator();

export default () => {
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
          headerLeft: () => <LeftComponent />,
          headerRight: () => <RigthComponent />,
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
