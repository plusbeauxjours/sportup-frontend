import React, { useState, useEffect } from "react";
import { ActivityIndicator, AsyncStorage } from "react-native";
import { Appbar } from "react-native-paper";

import { ME, MY_FEED } from "./MyProfileScreenQueries";
import { Me, GetMyFeed, GetMyFeedVariables } from "../../types/api";
import MyProfileHeader from "../../components/MyProfileHeader";
import FeedList from "../../components/FeedList";
import ListFooterComponent from "../../components/ListFooterComponent";
import styled from "styled-components/native";
import { useQuery } from "react-apollo-hooks";

const View = styled.View`
  flex-direction: row;
`;

const MyProfileScreen = ({ navigation }) => {
  let pageNum = 1;
  const [loading, setLoading] = useState<boolean>(false);

  const {
    data: { me: { user = null } = {} } = {},
    loading: meLoading,
  } = useQuery<Me>(ME);

  const {
    data: { getMyFeed: { posts = null } = {} } = {},
    loading: getMyFeedLoading,
    fetchMore: getMyFeedFetchMore,
    networkStatus,
    refetch: getMyFeedRefetch,
  } = useQuery<GetMyFeed, GetMyFeedVariables>(MY_FEED, {
    variables: { pageNum },
    fetchPolicy: "network-only",
  });

  const onTeamsPress = (userId) => {
    navigation.push("TeamsScreen", {
      userId,
    });
  };

  const onFollowersPress = (userId) => {
    navigation.push("FollowersScreen", {
      userId,
    });
  };

  const onFollowingPress = (userId) => {
    navigation.push("FollowingScreen", {
      userId,
    });
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Auth");
  };

  useEffect(() => {
    navigation.setParams({
      logout: handleLogout,
    });
  }, []);

  const renderUserInfoArea = () => {
    if (meLoading) {
      return <ActivityIndicator size="large" style={{ margin: 20 }} />;
    } else if (user) {
      const connections = {
        teams: user?.teamsCount,
        followers: user?.followersCount,
        following: user?.followingCount,
      };
      return (
        <MyProfileHeader
          userImg={user?.userImg}
          name={`${user?.firstName} ${user?.lastName}`}
          username={user?.username}
          bio={user?.bio}
          sports={user?.sports}
          connections={connections}
          onTeamsPress={() => {
            onTeamsPress(user?.id);
          }}
          onFollowersPress={() => {
            onFollowersPress(user?.id);
          }}
          onFollowingPress={() => {
            onFollowingPress(user?.id);
          }}
        />
      );
    } else {
      return null;
    }
  };
  if (getMyFeedLoading) {
    return <ActivityIndicator size="large" style={{ margin: 20 }} />;
  } else {
    return (
      <FeedList
        posts={posts}
        refreshing={networkStatus === 4}
        onRefresh={() => {
          pageNum = 1;
          getMyFeedRefetch({ pageNum });
        }}
        ListHeaderComponent={renderUserInfoArea}
        ListFooterComponent={() => <ListFooterComponent loading={loading} />}
        onEndReached={() => {
          if (!loading) {
            pageNum += 1;
            getMyFeedFetchMore({
              variables: {
                pageNum,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                if (!fetchMoreResult.getMyFeed) return prev;
                return Object.assign({}, prev, {
                  getMyFeed: {
                    ...prev.getMyFeed,
                    posts: [
                      ...prev.getMyFeed.posts,
                      ...fetchMoreResult.getMyFeed.posts,
                    ],
                  },
                });
              },
            });
            setLoading(true);
          }
        }}
        onEndReachedThreshold={0.2}
        onMomentumScrollBegin={() => {
          setLoading(false);
        }}
        disableNavigation={true}
      />
    );
  }
};
MyProfileScreen.navigationOptions = ({ navigation }) => ({
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
    <View>
      <Appbar.Action
        icon="square-edit-outline"
        onPress={() => {
          navigation.navigate("EditProfileScreen");
        }}
      />
      <Appbar.Action
        icon="exit-to-app"
        onPress={navigation.getParam("logout")}
      />
    </View>
  ),
});

export default MyProfileScreen;
