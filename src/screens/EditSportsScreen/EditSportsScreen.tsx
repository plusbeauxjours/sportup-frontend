import React, { useState } from "react";
import { useQuery, useMutation } from "react-apollo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { ME } from "../MyProfileScreen/MyProfileScreenQueries";
import { GET_ALL_SPORTS } from "../FindPlayerScreen/FindPlayerScreenQueries";
import RatingChip from "../../components/RatingChip";
import { UPDATE_SPORTS } from "./EditSportsScreenQueries";
import {
  GetAllSports,
  Me,
  UpdateSports,
  UpdateSportsVariables,
} from "../../types/api";
import styled from "styled-components/native";
import Loader from "../../components/Loader";
import Button from "../../components/Button";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export default ({ navigation }) => {
  const [selectedSportIds, setSelectedSportsIds] = useState<any>([]);

  const {
    data: { me: { user = null } = {} } = {},
    loading: meLoading,
  } = useQuery<Me>(ME, {
    onCompleted: ({ me }) =>
      me?.user?.sports.forEach(({ sportId }) =>
        setSelectedSportsIds((i) => [...i, sportId])
      ),
  });

  const {
    data: { getAllSports: { sports = null } = {} } = {},
    loading: getAllSportsLoading,
  } = useQuery<GetAllSports>(GET_ALL_SPORTS, {
    fetchPolicy: "network-only",
  });

  const [updateSportsFn, { loading: updateUserLoading }] = useMutation<
    UpdateSports,
    UpdateSportsVariables
  >(UPDATE_SPORTS, {
    update(cache, { data: { updateSports } }) {
      try {
        const { me } = cache.readQuery<Me>({ query: ME });
        cache.writeQuery({
          query: ME,
          data: {
            me: {
              ...me,
              user: {
                ...me?.user,
                sports: updateSports.user.sports,
              },
            },
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
  });

  const toggleSportChip = (sportId: string) => {
    if (selectedSportIds.includes(sportId)) {
      setSelectedSportsIds(selectedSportIds.filter((i) => i !== sportId));
    } else {
      setSelectedSportsIds((i) => [...i, sportId]);
    }
  };

  if (getAllSportsLoading || meLoading) {
    return <Loader />;
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
        <Row>
          {sports?.map((sport) => (
            <RatingChip
              sportId={sport.sportId}
              name={sport.name}
              selected={selectedSportIds.includes(sport.sportId)}
              key={sport.sportId}
              onChipPress={() => toggleSportChip(sport.sportId)}
            />
          ))}
        </Row>
        <Container>
          <Button
            onPress={() => {
              updateSportsFn({
                variables: {
                  sportIds: selectedSportIds,
                },
              });
              navigation.goBack();
            }}
            style={{ width: "90%", alignSelf: "center" }}
            loading={updateUserLoading}
            disabled={updateUserLoading}
            text={"Save"}
          />
        </Container>
      </KeyboardAwareScrollView>
    );
  }
};
