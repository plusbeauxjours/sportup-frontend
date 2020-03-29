import React from "react";
import { View, ActivityIndicator } from "react-native";

const AuthLoadingContainer: React.FC = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
};

export default AuthLoadingContainer;
