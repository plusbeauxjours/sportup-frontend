import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { Appbar, Headline, Caption, Paragraph } from "react-native-paper";
import styled from "styled-components/native";
import { useQuery } from "react-apollo-hooks";
import { Avatar } from "react-native-elements";

import { ME, MY_FEED } from "./MyProfileScreenQueries";
import { Me, GetMyFeed, GetMyFeedVariables } from "../../types/api";
import FeedList from "../../components/FeedList";
import ListFooterComponent from "../../components/ListFooterComponent";

import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../../constants/urls";
import SportsList from "../../components/SportsList";
import UserConnectionsCard from "../../components/UserConnectionsCard";
import Loader from "../../components/Loader";

const View = styled.View`
  flex-direction: row;
`;

const UserInfoContainer = styled.View`
  align-items: center;
  margin: 1px 0;
  background-color: #fff;
`;

const Conatiner = styled.View`
  flex: 1;
  background-color: white;
`;

const MyProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    data: { me: { user = null } = {} } = {},
    loading: meLoading,
  } = useQuery<Me>(ME);

  const {
    data: { getMyFeed: { posts = null, hasNextPage, pageNum } = {} } = {},
    loading: getMyFeedLoading,
    fetchMore: getMyFeedFetchMore,
    networkStatus,
    refetch: getMyFeedRefetch,
  } = useQuery<GetMyFeed, GetMyFeedVariables>(MY_FEED, {
    variables: { pageNum: 1 },
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
    if (user) {
      const connections = {
        teams: user?.teamsCount,
        followers: user?.followersCount,
        following: user?.followingCount,
      };
      return (
        <UserInfoContainer>
          <Avatar
            size="large"
            rounded
            containerStyle={{ marginTop: 40 }}
            source={{
              uri: user?.userImg
                ? MEDIA_URL + user?.userImg
                : NO_AVATAR_THUMBNAIL,
            }}
          />
          <Headline>{user?.name}</Headline>
          <Caption>{`@${user?.username}`}</Caption>
          <Paragraph>{user?.bio}</Paragraph>
          <SportsList sports={user?.sports} />
          <UserConnectionsCard
            {...connections}
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
        </UserInfoContainer>
      );
    } else {
      return null;
    }
  };
  if (getMyFeedLoading || meLoading) {
    return <Loader />;
  } else {
    return (
      <Conatiner>
        <FeedList
          posts={posts}
          refreshing={networkStatus === 4}
          onRefresh={() => {
            getMyFeedRefetch({ pageNum: 1 });
          }}
          ListHeaderComponent={renderUserInfoArea}
          ListFooterComponent={() => <ListFooterComponent loading={loading} />}
          onEndReached={() => {
            if (!loading && hasNextPage) {
              getMyFeedFetchMore({
                variables: {
                  pageNum: pageNum + 1,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  if (!fetchMoreResult.getMyFeed) return prev;
                  return Object.assign({}, prev, {
                    getMyFeed: {
                      ...prev.getMyFeed,
                      pageNum: fetchMoreResult.getMyFeed.pageNum,
                      hasNextPage: fetchMoreResult.getMyFeed.hasNextPage,
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
      </Conatiner>
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
