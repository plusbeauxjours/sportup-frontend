import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import { useMe } from "../context/meContext";
import { useMutation } from "react-apollo";
import {
  FollowUser,
  FollowUserVariables,
  Me,
  GetUserFollowing,
  GetUserFollowingVariables,
  UnfollowUser,
  UnfollowUserVariables
} from "../types/api";
import { ME } from "../screens/MyProfile/MyProfileQueries";
import { GET_USER_FOLLOWING } from "../screens/Following/FollowingQueries";
import styled from "styled-components";
import { FOLLOW_USER, UNFOLLOW_USER } from "./FollowBtn/FollowBtnQueries";

const View = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

interface IProps {
  uuid: string;
  isFollowing: boolean;
}

const UserInteractionCard: React.FC<IProps> = ({
  uuid,
  isFollowing: isFollowingProp
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

  <View>
    <Button icon="message" onPress={() => console.log("go to chat")}>
      Message
    </Button>
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
  </View>;
};

export default UserInteractionCard;
