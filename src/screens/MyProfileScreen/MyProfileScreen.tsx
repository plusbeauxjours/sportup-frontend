import React, { useState, useEffect } from "react";
import {
  AsyncStorage,
  ActivityIndicator,
  Platform,
  Alert,
  Linking,
} from "react-native";
import { Headline, Paragraph } from "react-native-paper";
import styled from "styled-components/native";
import { useQuery, useApolloClient, useMutation } from "react-apollo-hooks";
import { Avatar } from "react-native-elements";
import { Notifications } from "expo";
import Constants from "expo-constants";
import * as IntentLauncher from "expo-intent-launcher";
import * as Permissions from "expo-permissions";

import { ME, MY_FEED, REGISTER_PUSH } from "./MyProfileScreenQueries";
import {
  Me,
  GetMyFeed,
  GetMyFeedVariables,
  RegisterPush,
  RegisterPushVariables,
} from "../../types/api";
import FeedList from "../../components/FeedList";
import ListFooterComponent from "../../components/ListFooterComponent";

import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../../constants/urls";
import UserConnectionsCard from "../../components/UserConnectionsCard";
import Loader from "../../components/Loader";
import RatingChip from "../../components/RatingChip";
import { useNavigation } from "@react-navigation/native";
import { useLazyQuery } from "react-apollo";

const LoadingContainer = styled.View`
  height: 150px;
  justify-content: center;
  align-items: center;
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

const WhiteSpace = styled.View`
  height: 20px;
`;

const Row = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Caption = styled.Text`
  font-size: 10px;
  color: #999;
`;

const MyProfileScreen: React.FC = () => {
  const client = useApolloClient();
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);

  const [
    meData,
    {
      data: { me: { user = null } = {} } = {},
      loading: meLoading,
      refetch: meRefetch,
    },
  ] = useLazyQuery<Me>(ME);

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

  const [registerPushFn, { loading: registerPushLoading }] = useMutation<
    RegisterPush,
    RegisterPushVariables
  >(REGISTER_PUSH);

  const onTeamsPress = (userId) => {
    navigation.navigate("TeamsScreen", {
      userId,
    });
  };

  const onFollowersPress = (userId) => {
    navigation.navigate("FollowersScreen", {
      userId,
    });
  };

  const onFollowingPress = (userId) => {
    navigation.navigate("FollowingScreen", {
      userId,
    });
  };

  const handleLogout = async () => {
    client.resetStore();
    await AsyncStorage.clear();
    navigation.navigate("AuthNavigation");
  };
  const askPermission = async () => {
    const { status: notificationStatus } = await Permissions.askAsync(
      Permissions.NOTIFICATIONS
    );
    if (Platform.OS === "ios" && notificationStatus !== "granted") {
      Alert.alert(
        "Permission Denied",
        "To enable notification, tap Open Settings, then tap on Notifications, and finally tap on Allow Notifications.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Open Settings",
            onPress: () => {
              Linking.openURL("app-settings:");
            },
          },
        ]
      );
    } else if (Platform.OS === "android" && notificationStatus !== "granted") {
      Alert.alert(
        "Permission Denied",
        "To enable notification, tap Open Settings, then tap on Notifications, and finally tap on Allow Notifications.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Open Settings",
            onPress: () => {
              const pkg = Constants.manifest.releaseChannel
                ? Constants.manifest.android.package
                : "host.exp.exponent";
              IntentLauncher.startActivityAsync(
                IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
                { data: "package:" + pkg }
              );
            },
          },
        ]
      );
    } else if (notificationStatus === "granted") {
      let pushToken = await Notifications.getExpoPushTokenAsync();
      const { data: serverData } = await registerPushFn({
        variables: { pushToken },
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    meData();
    askPermission();
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
          <WhiteSpace />
          <Paragraph style={{ textAlign: "center", paddingHorizontal: 20 }}>
            {user?.bio}
          </Paragraph>
          <WhiteSpace />
          <Row>
            {user?.sports?.map((sport) => (
              <RatingChip
                sportId={sport.sportId}
                name={sport.name}
                key={sport.sportId}
                disabled={true}
              />
            ))}
          </Row>
          <WhiteSpace />
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
      return (
        <LoadingContainer>
          <ActivityIndicator size="small" />
        </LoadingContainer>
      );
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
            meRefetch();
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

export default MyProfileScreen;
