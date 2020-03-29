import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Appbar, ActivityIndicator } from "react-native-paper";
import { AsyncStorage } from "react-native";
import { Me } from "../../types/api";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../../sharedQueries";

const View = styled.View``;
const Text = styled.Text``;
const Container = styled.View`
  flex-direction: row;
`;

const MyProfile = ({ navigation }) => {
  const { data, loading, error } = useQuery<Me>(ME);
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
  const onFollowersPress = (uuid: string) => {
    navigation.push("Following", { uuid });
  };

  useEffect(() => {
    navigation.setParams({
      logout: handleLogout
    });
  }, []);
  return (
    <Query query={Me}>
      {({ loading, error, data }) => {
        if (loading) {
          return <ActivityIndicator size="large" style={{ margin: 20 }} />;
        }
      }}
      <Text>MyProfile??</Text>
    </Query>
  );
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

export default MyProfile;
