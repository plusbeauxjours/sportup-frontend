import React from "react";
import { Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

import SportsList from "./SportsList";
import { useMe } from "../context/meContext";
import RatingChip from "./RatingChip";
import { GetUser_getUser_user_sports } from "../types/api";

const OuterUserInfoContainerStyle = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const InnerUserInfoContainerStyle = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

const TouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const View = styled.View`
  flex-direction: row;
`;

const WhiteSpace = styled.View`
  height: 10px;
`;

const NameText = styled.Text`
  font-size: 18px;
`;

const Caption = styled.Text`
  font-size: 10px;
  color: #999;
`;

interface IProps {
  id: string;
  sports: GetUser_getUser_user_sports;
  teams: any;
  navigation;
}

const PlayerCardBottomSection: React.FC<IProps> = ({ id, sports, teams }) => {
  const { me, loading: meLoading } = useMe();
  const navigation = useNavigation();

  return (
    <React.Fragment>
      <WhiteSpace />
      <SportsList sports={sports} />
      <WhiteSpace />
      <View
        style={{
          flexDirection: "column",
        }}
      >
        {teams?.map((team, index) => (
          <React.Fragment key={index}>
            <Divider />
            <OuterUserInfoContainerStyle>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("TeamProfileScreen", {
                    teamId: team?.id,
                  });
                }}
              >
                <InnerUserInfoContainerStyle>
                  <Row>
                    <NameText style={{ textTransform: "capitalize" }}>
                      {team?.teamName}
                    </NameText>
                    <RatingChip
                      sportId={team.sport.sportId}
                      name={team.sport.name}
                      onChipPress={() => {}}
                      disabled={true}
                    />
                  </Row>
                  <Caption>{`Created by ${team?.createdBy.name} (@${team?.createdBy.username})`}</Caption>
                </InnerUserInfoContainerStyle>
              </TouchableOpacity>
            </OuterUserInfoContainerStyle>
          </React.Fragment>
        ))}
      </View>
    </React.Fragment>
  );
};

export default PlayerCardBottomSection;
