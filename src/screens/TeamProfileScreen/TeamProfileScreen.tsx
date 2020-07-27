import React, { useState } from "react";
import styled from "styled-components/native";
import { FlatList, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { Divider } from "react-native-paper";
import { useQuery } from "react-apollo-hooks";

import { GetTeam, GetTeamVariables } from "../../types/api";
import { MEDIA_URL } from "../../constants/urls";
import RatingChip from "../../components/RatingChip";
import { GET_TEAM, RATE_TEAM } from "./TeamProfileScreenQueries";
import UserCard from "../../components/UserCard";
import RatingDialog from "../../components/RatingDialog";
import { useMutation } from "react-apollo";
import { RateTeam, RateTeamVariables } from "../../types/api";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import BackBtn from "../../components/BackBtn";

const View = styled.View`
  align-items: center;
  padding: 5px;
`;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const NameText = styled.Text`
  font-size: 18px;
`;

const InfoContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 250px;
  margin-top: 100px;
`;

const Image = styled.Image`
  width: 100%;
  height: 150px;
`;

const Touchable = styled.TouchableOpacity`
  align-items: center;
`;

const WhiteSpace = styled.View`
  height: 40px;
`;

interface IProps {
  coverImg: string;
  teamName: string;
  sport: any;
  showDialog: () => void;
  rating: number;
}

const TeamInfoArea: React.FC<IProps> = ({
  coverImg,
  teamName,
  sport,
  showDialog,
  rating,
}) => {
  return (
    <InfoContainer>
      {coverImg ? <Image source={{ uri: MEDIA_URL + coverImg }} /> : null}
      <View>
        <Touchable onPress={() => showDialog}>
          <NameText style={{ textTransform: "capitalize" }}>
            {teamName}
          </NameText>
          {rating && (
            <>
              <WhiteSpace />
              <NameText style={{ textTransform: "capitalize" }}>
                ⭐️{rating}
              </NameText>
            </>
          )}
        </Touchable>
        <WhiteSpace />
        <RatingChip
          sportId={sport.sportId}
          name={sport.name}
          onChipPress={() => {}}
        />
      </View>
    </InfoContainer>
  );
};

const TeamProfileScreen = ({ navigation }) => {
  const teamId = navigation.getParam("teamId");
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const { data: { getTeam: { team = null } = {} } = {}, loading } = useQuery<
    GetTeam,
    GetTeamVariables
  >(GET_TEAM, { variables: { teamId } });

  const onStarRatingPress = (rating: number) => {
    setRating(rating);
  };

  const showDialog = () => {
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setRating(0);
    setDialogVisible(false);
  };

  const [rateTeamFn, { loading: rateTeamLoading }] = useMutation<
    RateTeam,
    RateTeamVariables
  >(RATE_TEAM, {
    variables: { teamId, rating },
  });

  const onSubmit = () => {
    rateTeamFn();
    closeDialog();
  };
  if (loading) {
    return <Loader />;
  } else {
    return (
      <Container>
        <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill}>
          <Image
            style={{
              position: "absolute",
              zIndex: -1,
              top: 0,
              width: "100%",
              height: "100%",
            }}
            source={require("../../../assets/roomDefault.jpeg")}
            // source={{ uri: MEDIA_URL + event.sport.sportImgUrl }}
            resizeMode="cover"
          />
          <FlatList
            data={team.members}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <>
                <UserCard user={item} />
              </>
            )}
            ItemSeparatorComponent={() => <Divider />}
            ListHeaderComponent={() => (
              <TeamInfoArea
                coverImg={team.coverImg}
                teamName={team.teamName}
                sport={team.sport}
                showDialog={showDialog}
                rating={team.rating}
              />
            )}
            ListFooterComponent={
              team.isAdmin && (
                <Button
                  disabled={loading || rateTeamLoading}
                  onPress={() => {
                    navigation.navigate("EditTeamProfileScreen", { team });
                  }}
                  text={"Edit team"}
                />
              )
            }
          />
          <RatingDialog
            visible={dialogVisible}
            rating={rating}
            onStarRatingPress={onStarRatingPress}
            close={closeDialog}
            onSubmit={onSubmit}
          />
        </BlurView>
      </Container>
    );
  }
};
TeamProfileScreen.navigationOptions = {
  title: "Team Profile",
  headerBackTitleVisible: false,
  headerBackImage: () => <BackBtn />,
  headerTransparent: true,
  headerBackground: () => (
    <BlurView intensity={70} tint="light" style={StyleSheet.absoluteFill} />
  ),
};

export default TeamProfileScreen;
