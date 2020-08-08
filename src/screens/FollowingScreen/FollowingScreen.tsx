import React from "react";
import { GetUserFollowing, GetUserFollowingVariables } from "../../types/api";
import { useQuery } from "react-apollo";
import { GET_USER_FOLLOWING } from "./FollowingScreenQueries";
import ListFooterComponent from "../../components/ListFooterComponent";
import UserCard from "../../components/UserCard";
import styled from "styled-components/native";
import { FlatList } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

interface IProps {
  userId: string;
}

const FollowingScreen: React.FC<IProps> = ({ route }) => {
  const { userId } = route.params;
  const {
    data: { getUser: { user: { following = null } = {} } = {} } = {},
    loading,
  } = useQuery<GetUserFollowing, GetUserFollowingVariables>(
    GET_USER_FOLLOWING,
    { variables: { userId } }
  );
  return (
    <Container>
      <FlatList
        data={following}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UserCard user={item} />}
        ListFooterComponent={() => <ListFooterComponent loading={loading} />}
      />
    </Container>
  );
};

export default FollowingScreen;
