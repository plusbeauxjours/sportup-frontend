import React from "react";
import {
  GetUserFollowers,
  GetUserFollowersVariables,
  GetUserFollowers_getUser_user_followers,
} from "../../types/api";
import { useQuery } from "react-apollo";
import { GET_USER_FOLLOWERS } from "./FollowersScreenQueries";
import UserCardList from "../../components/UserCardList";
import ListFooterComponent from "../../components/ListFooterComponent";
import { Divider } from "react-native-paper";
import UserCard from "../../components/UserCard";
import styled from "styled-components/native";
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps,
} from "react-navigation-stack";

interface IProps extends NavigationStackScreenProps {
  userId: string;
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const FollowersScreen: NavigationStackScreenComponent<IProps> = ({
  navigation,
}) => {
  const userId = navigation.getParam("userId");
  const { data: { getUser: { user = null } = {} } = {}, loading } = useQuery<
    GetUserFollowers,
    GetUserFollowersVariables
  >(GET_USER_FOLLOWERS, {
    variables: { userId },
  });
  return (
    <Container>
      <UserCardList
        users={user?.followers}
        keyExtractor={(item: GetUserFollowers_getUser_user_followers) =>
          item.id.toString()
        }
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <UserCard
            userId={item.id}
            userImg={item.userImg}
            name={item.name}
            username={item.username}
            isFollowing={item.isFollowing}
          />
        )}
        ListFooterComponent={() => <ListFooterComponent loading={loading} />}
      />
    </Container>
  );
};
FollowersScreen.navigationOptions = {
  title: "Followers",
};

export default FollowersScreen;
