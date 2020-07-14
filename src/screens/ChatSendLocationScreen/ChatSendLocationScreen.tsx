import React, { Component } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { MapView } from "expo";
import { Icon } from "react-native-elements";
import { Button } from "react-native-paper";

const ICON_SIZE = 35;

const INITIAL_REGION = {
  latitude: 29,
  longitude: 68,
  latitudeDelta: 20,
  longitudeDelta: 16,
};

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

export default class ChatSendLocationScree extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.onSend = this.onSend.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onMapReady = this.onMapReady.bind(this);
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);

    this.map = null;
    this.state = {
      paddingTop: 1,
      ready: false,
      region: INITIAL_REGION,
    };
  }

  componentDidMount = () => {
    this.getCurrentPosition();
    setTimeout(() => {
      this.setState((prevState) => ({
        ...prevState,
        paddingTop: 0,
      }));
    }, 500);
  };

  onMapReady = () => {
    if (!this.state.ready) {
      this.setState((prevState) => ({ ...prevState, ready: true }));
    }
  };

  onCancel = () => {
    this.props.navigation.goBack();
  };

  onSend = () => {
    const { longitude, latitude } = this.state.region;
    this.props.navigation.state.params.onSend({
      location: { longitude, latitude },
    });
    this.props.navigation.goBack();
  };

  onRegionChangeComplete = (region) => {
    this.setState((prevState) => ({ ...prevState, region }));
  };

  setRegion = (region) => {
    if (this.state.ready) {
      setTimeout(() => this.map.animateToRegion(region), 10);
    }
  };

  getCurrentPosition = () => {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
          this.setRegion(region);
        },
        (error) => {
          // TODO: better design
          switch (error.code) {
            case 1:
              Alert.alert(
                "Error",
                "To find your location, please allow the app to access your location."
              );
              break;
            default:
              Alert.alert(
                "Error",
                "There was an error detecting your location."
              );
          }
        }
      );
    } catch (e) {
      Alert.alert("Error", e.message || "");
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            paddingTop: this.state.paddingTop,
          }}
        >
          <MapView
            ref={(map) => {
              this.map = map;
            }}
            initialRegion={INITIAL_REGION}
            showsUserLocation
            showsMyLocationButton
            onMapReady={this.onMapReady}
            onRegionChangeComplete={this.onRegionChangeComplete}
            style={{ flex: 1 }}
          />
          <View pointerEvents="none" style={styles.markerContainer}>
            <Icon
              name="location-on"
              color="red"
              size={ICON_SIZE}
              pointerEvents="none"
              containerStyle={{ marginBottom: ICON_SIZE - 4 }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            backgroundColor: "#fff",
          }}
        >
          <Button color="red" onPress={this.onCancel} style={{ flex: 1 }}>
            Cancel
          </Button>
          <Button color="#4a80f5" onPress={this.onSend} style={{ flex: 1 }}>
            Send
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  markerContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
