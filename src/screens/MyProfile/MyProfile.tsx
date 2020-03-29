import React, { useEffect } from "react";
import styled from "styled-components";
import { Appbar } from "react-native-paper";
import { AsyncStorage, Platform, View, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { useQuery } from "react-apollo-hooks";

import { ME, MY_FEED } from "./MyProfileQueries";
import { Me, MyFeed } from "../../types/api";

import Loader from "../../components/Loader";
import FeedList from "../../components/FeedList";
import MyProfileHeader from "../../components/MyProfileHeader";
import ListFooterComponent from "../../components/ListFooterComponent";

const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Container = styled.View`
  flex-direction: row;
`;

const MyProfile = ({ navigation }) => {
  const {
    data: { me: { user: me = null } = {} } = {},
    loading: meLoading
  } = useQuery<Me>(ME);
  const {
    data: { myFeed = null } = {},
    fetchMore,
    loading: feedLoading,
    networkStatus,
    refetch
  } = useQuery<MyFeed>(MY_FEED);
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
      teams: me.teamsCount && me.teamsCount,
      followers: me.followersCount && me.followersCount,
      following: me.followingCount && me.followingCount
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
  if (meLoading || feedLoading) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  } else if (!meLoading && !feedLoading && me && myFeed) {
    console.log("myFeed", myFeed);
    console.log("me", me);
    let pageNum = 1;
    let onEndReachedCalledDuringMomentum = true;
    return (
      <FeedList
        feed={myFeed}
        refreshing={networkStatus === 4}
        onRefresh={() => {
          pageNum = 1;
          refetch({
            pageNum
          });
        }}
        ListHeaderComponent={renderUserInfoArea}
        ListFooterComponent={() => (
          <ListFooterComponent loading={feedLoading} />
        )}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum) {
            pageNum += 1;
            fetchMore({
              variables: {
                pageNum
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                if (!fetchMoreResult.myFeed) return prev;
                return Object.assign({}, prev, {
                  myFeed: [...prev.myFeed, ...fetchMoreResult.myFeed]
                });
              }
            });
            onEndReachedCalledDuringMomentum = true;
          }
        }}
        onEndReachedThreshold={0.2}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum = false;
        }}
        disableNavigation
      />
    );
  } else {
    return null;
  }
};
MyProfile.navigationOptions = ({ navigation }) => ({
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
