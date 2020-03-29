import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Appbar } from "react-native-paper";
import { AsyncStorage } from "react-native";
import Loader from "../../components/Loader";
import { withNavigation } from "react-navigation";
import { useQuery } from "react-apollo-hooks";
import { Me } from "../../types/api";
import { ME } from "./MyProfileQueries";
import MyProfileHeader from "../../components/MyProfileHeader";

const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Container = styled.View`
  flex-direction: row;
`;

const MyProfile = ({ navigation }) => {
  const { data: { me: { user: me = null } = {} } = {}, loading } = useQuery<Me>(
    ME
  );

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Auth");
  };
  const onTeamsPress = (uuid: string) => {
    navigation.push("UserTeams", {
      uuid
    });
  };
  const onFollowersPress = (uuid: string) => {
    navigation.push("Followers", {
      uuid
    });
  };
  const onFollowingPress = (uuid: string) => {
    navigation.push("Following", { uuid });
  };
  const renderUserInfoArea = () => {
    const connections = {
      teams: me.teamsCount,
      followers: me.followersCount,
      following: me.followingCount
    };
    return (
      <MyProfileHeader
        avatar={me.userImg}
        name={`${me.firstName} ${me.lastName}`}
        handle={me.username}
        bio={me.bio}
        sports={me.sports}
        connections={connections}
        onTeamsPress={() => {
          onTeamsPress(me.id);
        }}
        onFollowersPress={() => {
          onFollowersPress(me.id);
        }}
        onFollowingPress={() => {
          onFollowingPress(me.id);
        }}
      />
    );
  };
  useEffect(() => {
    navigation.setParams({
      logout: handleLogout
    });
  }, []);
  if (loading) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  } else {
    let pageNum = 1;
    return (

    )
  }
};
MyProfile.navigationOptions = ({ navigation }) => ({
  title: "Me",
  headerLeft: (
    <Appbar.Action
      icon="menu"
      onPress={() => {
        navigation.toggleDrawer();
      }}
    />
  ),
  headerRight: (
    <Container>
      <Appbar.Action
        icon="square-edit-outline"
        onPress={() => {
          navigation.navigate("EditProfile");
        }}
      />
      <Appbar.Action
        icon="exit-to-app"
        onPress={navigation.getParam("logout")}
      />
    </Container>
  )
});

export default withNavigation(MyProfile);
