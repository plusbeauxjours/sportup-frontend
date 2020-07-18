import React from "react";
import { Button } from "react-native-paper";

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
      style={{ width: long ? 200 : 100, margin: 10 }}
      labelStyle={{ color: disabled ? "gray" : "#ffa500", fontWeight: "600" }}
      color={"#ffa500"}
      compact={true}
      uppercase={true}
      {...rest}
    >
      {text}
    </Button>
  );
};
