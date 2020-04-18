import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import { ActivityIndicator } from "react-native";
import { Searchbar } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ME } from "../MyProfileScreen/MyProfileScreenQueries";
import { GET_ALL_SPORTS } from "../CreateTeamScreen/CreateTeamScreenQueries";
import { UPDATE_SPORTS } from "./EditSportsScreenQueries";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import RatingChip from "../../components/RatingChip";
import styled from "styled-components";
import {
  GetAllSports_getAllSports_sports,
  GetAllSports,
  UpdateSports,
  UpdateSportsVariables,
  Me,
} from "../../types/api";
import { useMutation } from "react-apollo";

const Container = styled.View``;
const View = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
const Button = styled.Button`
  margin-top: 10px;
  width: 90%;
`;

const EditSportsScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [search, setSearch] = useState<string>("");
  const [allSports, setAllSports] = useState<
    [GetAllSports_getAllSports_sports]
  >([]);
  const [selectedSports, setSelectedSports] = useState<[]>([]);
  const {
    data: { getAllSports: { sports = null } = {} } = {},
    loading: getAllSportsLoading,
  } = useQuery<GetAllSports>(GET_ALL_SPORTS, { fetchPolicy: "network-only" });
  const [udpateSportsFn, { loading: udpateSportsLoading }] = useMutation<
    UpdateSports,
    UpdateSportsVariables
  >(UPDATE_SPORTS, {
    update(
      cache,
      {
        data: {
          updateSports: { user },
        },
      }
    ) {
      try {
        const { me } = cache.readQuery<Me>({
          query: ME,
        });
        cache.writeQuery({
          query: ME,
          data: {
            me: {
              ...me,
              user: { ...me.user, sports: user.sports },
            },
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
  });
  const onChangeText = (query) => {
    allSports.filter((sport) =>
      sport.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const onSavePress = () => {
    const selectedSportUuids = selectedSports
      .filter((sport) => sport === true)
      .map((_, index) => index + 1);
    navigation.goBack();
  };

  const toggleSportChip = (index) => {
    console.log("nani");
  };

  if (getAllSportsLoading) {
    return <ActivityIndicator size="large" />;
  } else {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "space-between",
          marginBottom: 10,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeText}
            value={search}
          />
          <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
            <View style={{}}>
              {sports.map(({ sportUuid, name }) => (
                <RatingChip
                  sportUuid={sportUuid}
                  name={name}
                  selected={selectedSports.length > 0}
                  key={sportUuid}
                  onChipPress={() => console.log("onPress")}
                />
              ))}
            </View>
          </KeyboardAwareScrollView>
        </Container>
        <Button
          onPress={() => {
            const selectedSportUuids = [];
            selectedSports.forEach((sport, index) => {
              if (sport === true) {
                selectedSportUuids.push(index + 1);
              }
            });
            udpateSportsFn({
              variables: {
                sportUuids: selectedSportUuids,
              },
            });
            navigation.goBack();
          }}
          loading={udpateSportsLoading}
          disabled={udpateSportsLoading}
          title="Save"
        />
      </KeyboardAwareScrollView>
    );
  }
};
EditSportsScreen.navigationOptions = {
  title: "Edit Sports",
};

export default EditSportsScreen;