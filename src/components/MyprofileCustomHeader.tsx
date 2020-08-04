import React from "react";
import styled from "styled-components/native";
import { Header } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 40px;
`;
const View = styled.View`
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
const LeftComponent = withNavigation(({ navigation }) => {
  return (
    <IconContainer onPress={() => navigation.toggleDrawer()}>
      <Ionicons size={24} name={"ios-menu"} />
    </IconContainer>
  );
});

const CenterComponent = ({ title, subTitle }) => {
  return (
    <View>
      <Text>{title}</Text>
      <SmallText>{subTitle}</SmallText>
    </View>
  );
};

const RigthComponent = withNavigation(({ navigation }) => {
  return (
    <>
      <IconContainer onPress={() => navigation.navigate("EditProfileScreen")}>
        <Ionicons size={24} name={"square-edit-outline"} />
      </IconContainer>
      <IconContainer onPress={() => navigation.getParam("logout")}>
        <Ionicons size={24} name={"exit-to-app"} />
      </IconContainer>
    </>
  );
});

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
