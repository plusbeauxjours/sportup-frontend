import React, { useState } from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  withNavigation
} from "react-navigation";
import { Subheading, Caption, Paragraph, Button } from "react-native-paper";
import { Avatar } from "react-native-elements";
import { MEDIA_URL } from "../../constants/urls";
import { useMutation } from "react-apollo";
import styled from "styled-components";
import {
  FollowUser,
  FollowUserVariables,
  UnfollowUser,
  UnfollowUserVariables,
  Me
} from "../../types/api";
import { FOLLOW_USER, UNFOLLOW_USER } from "./UserCardQueries";
import { ME } from "../../screens/MyProfile/MyProfileQueries";

const View = styled.View``;
const OuterUserInfoContainer = styled.View`
  width: 100%;
  flex-direction: row;
  margin: 10px 0 10px 0;
  padding: 0 5px 0 5px;
`;
const TouchableOpacity = styled.View`
  flex: 1;
  padding-left: 15px;
`;
// const Button = styled.Button``;

interface IProps {
  uuid: string;
  avatar?: string;
  name: string;
  handle: string;
  bio?: string;
  following?: boolean;
  navigation?: NavigationScreenProp<NavigationState, NavigationParams>;
}

const UserCard: React.FC<IProps> = withNavigation(
  ({
    uuid,
    avatar = null,
    name,
    handle,
    bio = "",
    following: followingProp = false,
    navigation
  }) => {
    const [following, setFollowing] = useState<boolean>(followingProp);
    const [followUserFn, { loading: followUserLoading }] = useMutation<
      FollowUser,
      FollowUserVariables
    >(FOLLOW_USER, {
      variables: { uuid },
      update(cache) {
        try {
          const { me } = cache.readQuery<Me>({
            query: ME
          });
          cache.writeQuery({
            query: ME,
            data: {
              me: {
                ...me,
                user: { ...me.user, followingCount: me.user.followingCount + 1 }
              }
            }
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
    const [unfollowUserFn, { loading: unfollowUserLoading }] = useMutation<
      UnfollowUser,
      UnfollowUserVariables
    >(UNFOLLOW_USER, {
      variables: { uuid },
      update(cache) {
        try {
          const { me } = cache.readQuery<Me>({
            query: ME
          });
          cache.writeQuery({
            query: ME,
            data: {
              me: {
                ...me,
                user: { ...me.user, followingCount: me.user.followingCount - 1 }
              }
            }
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
    return (
      <OuterUserInfoContainer>
        <Avatar
          rounded
          containerStyle={{ marginTop: 5, marginLeft: 5 }}
          source={{
            uri: avatar
              ? MEDIA_URL + avatar
              : "https://gblobscdn.gitbook.com/spaces%2F-L-nWFFFG5HNhz4YeOI_%2Favatar.png?generation=1523478414663564&alt=media"
          }}
          onPress={() => navigation.navigate("MyProfile")}
        />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => navigation.navigate("MyProfile")}>
              <Subheading numberOfLines={1}>{name}</Subheading>
              <Caption numberOfLines={1}>{`@${handle}`}</Caption>
            </TouchableOpacity>
            <Button
              primary={following}
              icon={!following && "account-plus"}
              onPress={() => {
                if (following) {
                  unfollowUserFn();
                } else {
                  followUserFn();
                }
                setFollowing(following => !following);
              }}
              color={following && "gray"}
            >
              {following ? "Following" : "Follow"}
            </Button>
          </View>
          <Paragraph numberOfLines={2} style={{ padding: 5 }}>
            {bio}
          </Paragraph>
        </View>
      </OuterUserInfoContainer>
    );
  }
);

export default UserCard;
