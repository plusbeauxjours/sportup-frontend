import React, { useState } from "react";
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
import UserConnectionsCard from "../../components/UserConnectionsCard";
import RatingDialog from "../../components/RatingDialog";
import { useMe } from "../../context/meContext";
import Loader from "../../components/Loader";
import RatingChip from "../../components/RatingChip";
import { ActivityIndicator } from "react-native";

const UserInfoContainer = styled.View`
  align-items: center;
  margin: 1px 0;
  background-color: #fff;
`;

const LoadingContainer = styled.View`
  height: 150px;
`;

const Row = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const WhiteSpace = styled.View`
  height: 20px;
`;

const Conatiner = styled.View`
  flex: 1;
  background-color: white;
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
      return (
        <LoadingContainer>
          <ActivityIndicator size="small" />
        </LoadingContainer>
      );
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
          <WhiteSpace />
          <Paragraph style={{ textAlign: "center", paddingHorizontal: 20 }}>
            {user.bio}
          </Paragraph>
          <WhiteSpace />
          <Row>
            {user?.sports?.map((sport) => (
              <RatingChip
                sportId={sport.sportId}
                name={sport.name}
                key={sport.sportId}
                onChipPress={showDialog}
              />
            ))}
          </Row>
          <WhiteSpace />
          <UserInteractionCard
            senderUserId={me?.user.id}
            senderUsername={me?.user.username}
            senderPushToken={me?.user.pushToken}
            receiverUserId={user.id}
            receiverUsername={user.username}
            receiverPushToken={user.pushToken}
            isFollowing={user.isFollowing}
          />
          <WhiteSpace />
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
    return <Loader />;
  } else {
    return (
      <Conatiner>
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
      </Conatiner>
    );
  }
};
UserProfileScreen.navigationOptions = ({ navigation }) => ({
  title: "User Profile",
});

export default UserProfileScreen;
