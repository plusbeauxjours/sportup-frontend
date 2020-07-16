import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { useMutation } from "react-apollo";
import { Avatar } from "react-native-elements";
import { useQuery } from "react-apollo-hooks";
import { Headline, Caption, Paragraph } from "react-native-paper";

import {
  GetUser,
  GetUserVariables,
  GetUserFeed,
  GetUserFeedVariables,
  RateUserSport,
  RateUserSportVariables,
} from "../../types/api";
import {
  GET_USER,
  GET_USER_FEED,
  RATE_USER_SPORT,
} from "./UserProfileScreenQueries";
import FeedList from "../../components/FeedList";
import ListFooterComponent from "../../components/ListFooterComponent";
import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../../constants/urls";
import UserInteractionCard from "../../components/UserInteractionCard";
import SportsList from "../../components/SportsList";
import UserConnectionsCard from "../../components/UserConnectionsCard";
import RatingDialog from "../../components/RatingDialog";
import { useMe } from "../../context/meContext";

const UserInfoContainer = styled.View`
  align-items: center;
  margin: 1px 0;
  background-color: #fff;
`;

const UserProfileScreen = ({ navigation }) => {
  const { me } = useMe();
  const userId = navigation.getParam("userId");
  const [loading, setLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [ratingSportWithId, setRatingSportWithId] = useState<string>(null);

  const {
    data: { getUserFeed: { posts = null, hasNextPage, pageNum } = {} } = {},
    loading: getUserFeedLoading,
    fetchMore: getUserFeedFetchMore,
    networkStatus,
    refetch: getUserFeedRefetch,
  } = useQuery<GetUserFeed, GetUserFeedVariables>(GET_USER_FEED, {
    variables: { userId, pageNum: 1 },
    fetchPolicy: "network-only",
  });

  const {
    data: { getUser: { user = null } = {} } = {},
    loading: getUserLoading,
  } = useQuery<GetUser, GetUserVariables>(GET_USER, {
    variables: { userId },
    fetchPolicy: "network-only",
  });

  const [rateUserSportFn, { loading: rateUserSportLoading }] = useMutation<
    RateUserSport,
    RateUserSportVariables
  >(RATE_USER_SPORT, {
    variables: { userId, sportId: ratingSportWithId, rating },
  });

  const onTeamsPress = (userId) => {
    navigation.push("TeamsScreen", { userId });
  };

  const onFollowersPress = (userId) => {
    navigation.push("FollowersScreen", { userId });
  };

  const onFollowingPress = (userId) => {
    navigation.push("FollowingScreen", { userId });
  };

  const showDialog = (sportId) => {
    setDialogVisible(true);
    setRatingSportWithId(sportId);
  };

  const closeDialog = () => {
    setDialogVisible(false);
    setRatingSportWithId(null);
  };

  const onStarRatingPress = (rating: number) => {
    setRating(rating);
  };

  const onSubmit = () => {
    rateUserSportFn();
    closeDialog();
  };

  const renderUserInfoArea = () => {
    if (getUserLoading) {
      return <ActivityIndicator size="large" style={{ margin: 20 }} />;
    } else if (user) {
      const connections = {
        teams: user.teamsCount,
        followers: user.followersCount,
        following: user.followingCount,
      };
      return (
        <UserInfoContainer>
          <Avatar
            size="large"
            rounded
            containerStyle={{ marginTop: 40 }}
            source={{
              uri: user.userImg
                ? MEDIA_URL + user.userImg
                : NO_AVATAR_THUMBNAIL,
            }}
          />
          <Headline>{user.name}</Headline>
          <Caption>{`@${user.username}`}</Caption>
          <Paragraph>{user.bio}</Paragraph>
          <UserInteractionCard
            senderUserIdForChat={me.user.id}
            senderUsernameForChat={me.user.username}
            receiverPushToken={user.pushToken}
            receiverUserIdForChat={user.id}
            isFollowing={user.isFollowing}
          />
          <SportsList sports={user.sports} onChipPress={showDialog} />
          <UserConnectionsCard
            {...connections}
            onTeamsPress={() => {
              onTeamsPress(user.id);
            }}
            onFollowersPress={() => {
              onFollowersPress(user.id);
            }}
            onFollowingPress={() => {
              onFollowingPress(user.id);
            }}
          />
        </UserInfoContainer>
      );
    } else {
      return null;
    }
  };
  if (getUserFeedLoading) {
    return <ActivityIndicator size="large" style={{ margin: 20 }} />;
  } else {
    return (
      <>
        <FeedList
          posts={posts}
          refreshing={networkStatus === 4}
          onRefresh={() => {
            getUserFeedRefetch({ userId, pageNum: 1 });
          }}
          ListHeaderComponent={renderUserInfoArea}
          ListFooterComponent={() => <ListFooterComponent loading={loading} />}
          onEndReached={() => {
            if (!loading && hasNextPage) {
              getUserFeedFetchMore({
                variables: {
                  pageNum: pageNum + 1,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  if (!fetchMoreResult.getUserFeed) return prev;
                  return Object.assign({}, prev, {
                    getUserFeed: {
                      ...prev.getUserFeed,
                      pageNum: fetchMoreResult.getUserFeed.pageNum,
                      hasNextPage: fetchMoreResult.getUserFeed.hasNextPage,
                      posts: [
                        ...prev.getUserFeed.posts,
                        ...fetchMoreResult.getUserFeed.posts,
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
        <RatingDialog
          visible={dialogVisible}
          rating={rating}
          onStarRatingPress={onStarRatingPress}
          close={closeDialog}
          onSubmit={onSubmit}
        />
      </>
    );
  }
};
UserProfileScreen.navigationOptions = ({ navigation }) => ({
  title: "User Profile",
});

export default UserProfileScreen;
