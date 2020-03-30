import React, { Component } from "react";
import { View, ActivityIndicator, AsyncStorage } from "react-native";

export default class AuthLoadingContainer extends Component {
  constructor(props) {
    super(props);
    this.checkAuthentication();
  }

  checkAuthentication = async () => {
    try {
      const uuid = await AsyncStorage.getItem("jwt");
      this.props.navigation.navigate(uuid ? "Main" : "Auth");
    } catch (_) {
      this.props.navigation.navigate("Auth");
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
}
