import React from "react";
import { Button } from "react-native-paper";
import { PRIMARY_COLOR } from "../constants/colors";

export default ({
  onPress,
  loading = false,
  disabled = false,
  long = false,
  text,
  ...rest
}) => {
  return (
    <Button
      loading={loading}
      onPress={onPress}
      disabled={disabled}
      mode="outlined"
      style={{
        width: long ? 240 : 140,
        margin: 10,
        justifyContent: "space-between",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      }}
      labelStyle={{
        color: disabled ? "gray" : PRIMARY_COLOR,
        fontWeight: "600",
      }}
      color={PRIMARY_COLOR}
      compact={true}
      uppercase={true}
      {...rest}
    >
      {text}
    </Button>
  );
};
