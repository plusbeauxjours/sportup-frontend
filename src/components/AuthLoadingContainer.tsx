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
      if (uuid) {
        global.uuid = Number(uuid);
        global.avatar =
          "https://scontent.fkhi6-1.fna.fbcdn.net/v/t1.0-1/c0.177.783.783/s40x40/21231949_1613499365350616_5879380150072247868_n.jpg?_nc_cat=0&oh=047fed68cf89ef82d1296c7ed951ee60&oe=5BD446A9";
      }
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
