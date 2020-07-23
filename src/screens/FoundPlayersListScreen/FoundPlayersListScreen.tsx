import React, { useState } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { Headline } from "react-native-paper";
import { useQuery } from "react-apollo";

import { GET_USERS_FOR_GAME } from "./FoundPlayersListScreenQueries";
import PlayerCard from "../../components/PlayerCard";
import { GetUsersForGameVariables, GetUsersForGame } from "../../types/api";
import Loader from "../../components/Loader";
import ListFooterComponent from "../../components/ListFooterComponent";
import BackBtn from "../../components/BackBtn";

const FoundPlayersListScreen = ({ navigation }) => {
  const sportIds = navigation.getParam("selectedSportIds");
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
      <FlatList
        data={users}
        renderItem={({ item }: any) => {
          return (
            <PlayerCard
              id={item.id}
              userImg={item.userImg}
              name={item.name}
              username={item.username}
              isFollowing={item.isFollowing}
              sports={item.sports}
              sportIds={sportIds}
            />
          );
        }}
        keyExtractor={(player: any) => player.id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() =>
          !getUsersForGameLoading ? (
            <View
              style={{
                padding: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Headline style={{ fontWeight: "bold" }}>&middot;</Headline>
            </View>
          ) : (
            <ActivityIndicator size="small" />
          )
        }
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
    );
  }
};
FoundPlayersListScreen.navigationOptions = {
  title: "Players",
  headerBackTitleVisible: false,
  headerBackImage: () => <BackBtn />,
};

export default FoundPlayersListScreen;
