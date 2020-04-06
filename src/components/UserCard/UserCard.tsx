import React, { useState, useEffect } from "react";
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
import { GetUserFollowing, GetUserFollowingVariables } from "../../types/api";
import { GET_USER_FOLLOWING } from "../../screens/Following/FollowingQueries";
import { useMe } from "../../context/meContext";

const View = styled.View``;
const OuterUserInfoContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin: 10px 0 10px 0;
  padding: 0 5px 0 5px;
`;
const TouchableOpacity = styled.View`
  flex: 1;
  padding-left: 15px;
`;

interface IProps {
  uuid: string;
  userImg?: string;
  name: string;
  username: string;
  bio?: string;
  isFollowing?: boolean;
  navigation?: NavigationScreenProp<NavigationState, NavigationParams>;
}

const UserCard: React.FC<IProps> = withNavigation(
  ({
    uuid,
    userImg = null,
    name,
    username,
    bio = "",
    isFollowing: isFollowingProp = false,
    navigation
  }) => {
    const { me, loading: meLoading } = useMe();
    const [isFollowing, setIsFollowing] = useState<boolean>(isFollowingProp);
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
        try {
          const data = cache.readQuery<
            GetUserFollowing,
            GetUserFollowingVariables
          >({
            query: GET_USER_FOLLOWING,
            variables: { uuid: me.user.uuid }
          });
          data.getUser.user.following.find(
            i => i.uuid === uuid
          ).isFollowing = true;
          if (data) {
            cache.writeQuery({
              query: GET_USER_FOLLOWING,
              variables: { uuid: me.user.uuid },
              data
            });
          }
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
        try {
          const data = cache.readQuery<
            GetUserFollowing,
            GetUserFollowingVariables
          >({
            query: GET_USER_FOLLOWING,
            variables: { uuid: me.user.uuid }
          });
          data.getUser.user.following.find(
            i => i.uuid === uuid
          ).isFollowing = false;
          if (data) {
            cache.writeQuery({
              query: GET_USER_FOLLOWING,
              variables: { uuid: me.user.uuid },
              data
            });
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
    useEffect(() => {
      setIsFollowing(isFollowingProp);
    }, []);
    return (
      <OuterUserInfoContainer>
        <Avatar
          rounded
          containerStyle={{ marginTop: 5, marginLeft: 5 }}
          source={{
            uri: userImg
              ? MEDIA_URL + userImg
              : "https://gblobscdn.gitbook.com/spaces%2F-L-nWFFFG5HNhz4YeOI_%2Favatar.png?generation=1523478414663564&alt=media"
          }}
          onPress={() => {
            me.user.uuid === uuid
              ? navigation.navigate("MyProfile")
              : navigation.navigate("UserProfile", { uuid });
          }}
        />
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.navigate("MyProfile")}>
              <Subheading numberOfLines={1}>{name}</Subheading>
              <Caption numberOfLines={1}>{`@${username}`}</Caption>
            </TouchableOpacity>
            <Button
              primary={isFollowing}
              icon={!isFollowing && "account-plus"}
              onPress={() => {
                if (isFollowing) {
                  unfollowUserFn();
                } else {
                  followUserFn();
                }
                setIsFollowing(isFollowing => !isFollowing);
              }}
              color={isFollowing && "gray"}
            >
              {isFollowing ? "Following" : "Follow"}
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
