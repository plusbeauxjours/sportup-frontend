import React from "react";
import {
  GetUserFollowers,
  GetUserFollowersVariables,
  GetUserFollowers_getUser_user_followers,
} from "../../types/api";
import { useQuery } from "react-apollo";
import { GET_USER_FOLLOWERS } from "./FollowersScreenQueries";
import ListFooterComponent from "../../components/ListFooterComponent";
import UserCard from "../../components/UserCard";
import styled from "styled-components/native";
import { FlatList } from "react-native";

interface IProps {
  userId: string;
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const FollowersScreen: React.FC<IProps> = ({ route }) => {
  const { userId } = route.params;

  const { data: { getUser: { user = null } = {} } = {}, loading } = useQuery<
    GetUserFollowers,
    GetUserFollowersVariables
  >(GET_USER_FOLLOWERS, {
    variables: { userId },
  });
  return (
    <Container>
      <FlatList
        data={user?.followers}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: GetUserFollowers_getUser_user_followers) =>
          item.id.toString()
        }
        renderItem={({ item }) => <UserCard user={item} />}
        ListFooterComponent={() => <ListFooterComponent loading={loading} />}
      />
    </Container>
  );
};

export default FollowersScreen;
