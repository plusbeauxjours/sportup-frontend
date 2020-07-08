import React from "react";
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
} from "react-navigation";
import { ActivityIndicator, AsyncStorage } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}
export default class AuthLoadingContainer extends React.Component<IProps> {
  constructor(props) {
    super(props);
    this.checkAuthentication();
  }

  checkAuthentication = async () => {
    try {
      const id = await AsyncStorage.getItem("jwt");
      this.props.navigation.navigate(id ? "Main" : "Auth");
    } catch (_) {
      this.props.navigation.navigate("Auth");
    }
  };

  render() {
    return (
      <Container>
        <ActivityIndicator />
      </Container>
    );
  }
}
