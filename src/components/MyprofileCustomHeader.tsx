import React from "react";
import styled from "styled-components/native";
import { Header } from "react-native-elements";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useApolloClient } from "react-apollo-hooks";
import { AsyncStorage } from "react-native";
import { useNavigation } from "@react-navigation/native";

import utils from "..//utils/utils";

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 40px;
`;
const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
`;
const Text = styled.Text`
  font-size: 18px;
  margin-right: 10px;
`;
const SmallText = styled.Text`
  font-size: 12px;
`;

interface IProps {
  title: string;
  subTitle?: string;
}
export const LeftComponent = () => {
  const isAndroid = utils.isAndroid();
  const navigation = useNavigation();

  return (
    <IconContainer
      style={{ marginLeft: 5 }}
      onPress={() => navigation.toggleDrawer()}
    >
      {isAndroid ? (
        <Ionicons size={24} name={"md-menu"} />
      ) : (
        <Ionicons size={24} name={"ios-menu"} />
      )}
    </IconContainer>
  );
};

const CenterComponent = ({ title, subTitle }) => {
  return (
    <Row>
      <Text>{title}</Text>
      <SmallText>{subTitle}</SmallText>
    </Row>
  );
};

export const RigthComponent = () => {
  const client = useApolloClient();
  const navigation = useNavigation();

  const handleLogout = async () => {
    client.resetStore();
    await AsyncStorage.clear();
    navigation.navigate("Auth");
  };
  return (
    <Row>
      <IconContainer onPress={() => navigation.navigate("EditProfileScreen")}>
        <FontAwesome size={24} name={"edit"} />
      </IconContainer>
      <IconContainer onPress={() => handleLogout()}>
        <FontAwesome size={24} name={"sign-out"} />
      </IconContainer>
    </Row>
  );
};

const MyprofileCustomHeader: React.FC<IProps> = ({ title, subTitle }) => {
  return (
    <Header
      placement="left"
      leftComponent={<LeftComponent />}
      centerComponent={<CenterComponent title={title} subTitle={subTitle} />}
      rightComponent={<RigthComponent />}
      containerStyle={{
        backgroundColor: "#fff",
        borderBottomColor: "#999",
        justifyContent: "space-around",
        alignItems: "center",
        borderBottomWidth: 0.5,
      }}
      barStyle={"dark-content"}
    />
  );
};

export default MyprofileCustomHeader;
