import React from "react";
import { GetUserFollowing, GetUserFollowingVariables } from "../../types/api";
import { useQuery } from "react-apollo";
import { GET_USER_FOLLOWING } from "./FollowingScreenQueries";
import { Divider } from "react-native-paper";
import UserCardList from "../../components/UserCardList";
import ListFooterComponent from "../../components/ListFooterComponent";
import UserCard from "../../components/UserCard";
import styled from "styled-components/native";
import BackBtn from "../../components/BackBtn";
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps,
} from "react-navigation-stack";

const Container = styled.View`
flex:1
  background-color: white;
`;

const Border = styled.View`
  border-color: #999;
  border-width: 0.2px;
  border-radius: 20px;
  padding: 10px;
  margin: 3px;
`;

interface IProps extends NavigationStackScreenProps {
  userId: string;
}

const FollowingScreen: NavigationStackScreenComponent<IProps> = ({
  navigation,
}) => {
  const {
    data: { getUser: { user: { following = null } = {} } = {} } = {},
    loading,
  } = useQuery<GetUserFollowing, GetUserFollowingVariables>(
    GET_USER_FOLLOWING,
    { variables: { userId: navigation.getParam("userId") } }
  );
  return (
    <Container>
      <UserCardList
        users={following}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <Border>
            <UserCard user={item} />
          </Border>
        )}
        ListFooterComponent={() => <ListFooterComponent loading={loading} />}
      />
    </Container>
  );
};
FollowingScreen.navigationOptions = {
  title: "Following",
  headerBackTitleVisible: false,
  headerBackImage: () => <BackBtn />,
};

export default FollowingScreen;
