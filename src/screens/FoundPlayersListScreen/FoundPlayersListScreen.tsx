import React, { useState } from "react";
import { FlatList } from "react-native";
import { useQuery } from "react-apollo";
import styled from "styled-components/native";
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { GET_USERS_FOR_GAME } from "./FoundPlayersListScreenQueries";
import PlayerCard from "../../components/PlayerCard";
import { GetUsersForGameVariables, GetUsersForGame } from "../../types/api";
import Loader from "../../components/Loader";
import ListFooterComponent from "../../components/ListFooterComponent";
import BackBtn from "../../components/BackBtn";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const FoundPlayersListScreen: NavigationStackScreenComponent = ({
  route,
  navigation,
}) => {
  const { selectedSportIds: sportIds } = route.params;
  const [loading, setLoading] = useState<boolean>(false);

  const {
    data: { getUsersForGame: { users = null, hasNextPage, pageNum } = {} } = {},
    loading: getUsersForGameLoading,
    fetchMore: getUsersForGameFetchMore,
    networkStatus,
    refetch: getUsersForGameRefetch,
  } = useQuery<GetUsersForGame, GetUsersForGameVariables>(GET_USERS_FOR_GAME, {
    variables: { sportIds, pageNum: 1 },
    fetchPolicy: "network-only",
  });

  if (getUsersForGameLoading) {
    return <Loader />;
  } else {
    return (
      <Container>
        <FlatList
          data={users}
          renderItem={({ item }) => {
            return <PlayerCard user={item} sportIds={sportIds} />;
          }}
          keyExtractor={(player) => player.id.toString()}
          showsVerticalScrollIndicator={false}
          refreshing={networkStatus === 4}
          onRefresh={() => {
            getUsersForGameRefetch({ sportIds, pageNum: 1 });
          }}
          ListFooterComponent={() => <ListFooterComponent loading={loading} />}
          onEndReached={() => {
            if (!loading && hasNextPage) {
              getUsersForGameFetchMore({
                variables: { sportIds, pageNum: pageNum + 1 },
                updateQuery: (prev: any, { fetchMoreResult }: any) => {
                  if (!fetchMoreResult) return prev;
                  if (!fetchMoreResult.getUsersForGame) return prev;
                  return Object.assign({}, prev, {
                    getUsersForGame: {
                      ...prev.getUsersForGame,
                      pageNum: fetchMoreResult.getUsersForGame.pageNum,
                      hasNextPage: fetchMoreResult.getUsersForGame.hasNextPage,
                      users: [
                        ...prev.getUsersForGame.users,
                        ...fetchMoreResult.getUsersForGame.users,
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
        />
      </Container>
    );
  }
};
FoundPlayersListScreen.navigationOptions = {
  title: "Players",
  headerBackTitleVisible: false,
  headerBackImage: () => <BackBtn />,
};

export default FoundPlayersListScreen;
