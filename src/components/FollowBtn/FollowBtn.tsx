import React, { useState, useEffect } from "react";
import { useMutation } from "react-apollo";
import { useMe } from "../../context/meContext";
import {
  Me,
  FollowUser,
  FollowUserVariables,
  UnfollowUser,
  UnfollowUserVariables,
  GetUserFollowing,
  GetUserFollowingVariables,
  GetUserFollowers,
  GetUserFollowersVariables,
} from "../../types/api";
import { GET_USER_FOLLOWING } from "../../screens/FollowingScreen/FollowingScreenQueries";
import { FOLLOW_USER, UNFOLLOW_USER } from "./FollowBtnQueries";
import { GET_USER_FOLLOWERS } from "../../screens/FollowersScreen/FollowersScreenQueries";
import Button from "../Button";
import { ME } from "../../screens/MyProfileScreen/MyProfileScreenQueries";

interface IProps {
  isFollowing: boolean;
  userId: string;
}

const FollowBtn: React.FC<IProps> = ({
  isFollowing: isFollowingProp = false,
  userId,
}) => {
  const { me, loading: meLoading } = useMe();
  const [isFollowing, setIsFollowing] = useState<boolean>(isFollowingProp);
  const [followUserFn, { loading: followUserLoading }] = useMutation<
    FollowUser,
    FollowUserVariables
  >(FOLLOW_USER, {
    variables: { userId },
    update(cache, { data: { followUser } }) {
      try {
        const { me } = cache.readQuery<Me>({ query: ME });
        cache.writeQuery({
          query: ME,
          data: {
            me: {
              ...me,
              user: { ...me.user, followingCount: me.user.followingCount + 1 },
            },
          },
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
          variables: { userId: me?.user.id },
        });
        const following = data.getUser.user.following.find(
          (i) => i.id === userId
        );
        if (following) {
          following.isFollowing = true;
        } else {
          data.getUser.user.following.push(followUser.following);
        }
        if (data) {
          cache.writeQuery({
            query: GET_USER_FOLLOWING,
            variables: { userId: me?.user.id },
            data,
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
          variables: { userId: me?.user.id },
        });
        const followers = data.getUser.user.followers.find(
          (i) => i.id === userId
        );
        if (followers) {
          followers.isFollowing = true;
        }
        if (data) {
          cache.writeQuery({
            query: GET_USER_FOLLOWERS,
            variables: { userId: me?.user.id },
            data,
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
  });
  const [unfollowUserFn, { loading: unfollowUserLoading }] = useMutation<
    UnfollowUser,
    UnfollowUserVariables
  >(UNFOLLOW_USER, {
    variables: { userId },
    update(cache, { data: { unfollowUser } }) {
      try {
        const { me } = cache.readQuery<Me>({ query: ME });
        cache.writeQuery({
          query: ME,
          data: {
            me: {
              ...me,
              user: { ...me.user, followingCount: me.user.followingCount - 1 },
            },
          },
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
          variables: { userId: me?.user.id },
        });
        const following = data.getUser.user.following.find(
          (i) => i.id === userId
        );
        if (following) {
          following.isFollowing = false;
        } else {
          data.getUser.user.following.push(unfollowUser.following);
        }
        if (data) {
          cache.writeQuery({
            query: GET_USER_FOLLOWING,
            variables: { userId: me?.user.id },
            data,
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
          variables: { userId: me?.user.id },
        });
        const followers = data.getUser.user.followers.find(
          (i) => i.id === userId
        );
        if (followers) {
          followers.isFollowing = false;
        } else {
          data.getUser.user.followers.push(unfollowUser.following);
        }
        if (data) {
          cache.writeQuery({
            query: GET_USER_FOLLOWERS,
            variables: { userId: me?.user.id },
            data,
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
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
        setIsFollowing((isFollowing) => !isFollowing);
      }}
      text={isFollowing ? "Following" : "Follow"}
    />
  );
};

export default FollowBtn;
