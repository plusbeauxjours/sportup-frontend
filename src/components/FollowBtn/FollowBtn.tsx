import React, { useState, useEffect } from "react";
import { useMutation } from "react-apollo";
import { useMe } from "../../context/meContext";
import {
  FollowUser,
  FollowUserVariables,
  UnfollowUser,
  UnfollowUserVariables,
  Me
} from "../../types/api";
import { Button } from "react-native-paper";
import { ME } from "../../screens/MyProfile/MyProfileQueries";
import {
  GetUserFollowing,
  GetUserFollowingVariables,
  GetUserFollowers,
  GetUserFollowersVariables
} from "../../types/api";
import { GET_USER_FOLLOWING } from "../../screens/Following/FollowingQueries";
import { FOLLOW_USER, UNFOLLOW_USER } from "./FollowBtnQueries";
import { GET_USER_FOLLOWERS } from "../../screens/Followers/FollowersQueries";

interface IProps {
  isFollowing: boolean;
  uuid: string;
}

const FollowBtn: React.FC<IProps> = ({
  isFollowing: isFollowingProp = false,
  uuid
}) => {
  const { me, loading: meLoading } = useMe();
  const [isFollowing, setIsFollowing] = useState<boolean>(isFollowingProp);
  const [followUserFn, { loading: followUserLoading }] = useMutation<
    FollowUser,
    FollowUserVariables
  >(FOLLOW_USER, {
    variables: { uuid },
    update(cache, { data: { followUser } }) {
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
        const following = data.getUser.user.following.find(
          i => i.uuid === uuid
        );
        if (following) {
          following.isFollowing = true;
        } else {
          data.getUser.user.following.push(followUser.following);
        }
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
      try {
        const data = cache.readQuery<
          GetUserFollowers,
          GetUserFollowersVariables
        >({
          query: GET_USER_FOLLOWERS,
          variables: { uuid: me.user.uuid }
        });
        const followers = data.getUser.user.followers.find(
          i => i.uuid === uuid
        );
        if (followers) {
          followers.isFollowing = true;
        } else {
          data.getUser.user.followers.push(followUser.following);
        }
        if (data) {
          cache.writeQuery({
            query: GET_USER_FOLLOWERS,
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
    update(cache, { data: { unfollowUser } }) {
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
        const following = data.getUser.user.following.find(
          i => i.uuid === uuid
        );
        if (following) {
          following.isFollowing = false;
        } else {
          data.getUser.user.following.push(unfollowUser.following);
        }
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
      try {
        const data = cache.readQuery<
          GetUserFollowers,
          GetUserFollowersVariables
        >({
          query: GET_USER_FOLLOWERS,
          variables: { uuid: me.user.uuid }
        });
        const followers = data.getUser.user.followers.find(
          i => i.uuid === uuid
        );
        if (followers) {
          followers.isFollowing = false;
        } else {
          data.getUser.user.followers.push(unfollowUser.following);
        }
        if (data) {
          cache.writeQuery({
            query: GET_USER_FOLLOWERS,
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
  );
};

export default FollowBtn;
