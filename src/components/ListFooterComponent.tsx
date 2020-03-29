import React from "react";
import { ActivityIndicator } from "react-native";
import { Headline } from "react-native-paper";
import styled from "styled-components";

const View = styled.View`
  margin: 6px, 0;
  justify-content: "center";
  align-items: "center";
`;

interface IProps {
  loading: boolean;
}

const ListFooterComponent: React.FC<IProps> = ({ loading }) => (
  <View>
    {loading ? (
      <ActivityIndicator size="small" />
    ) : (
      <Headline style={{ fontWeight: "bold" }}>&middot;</Headline>
    )}
  </View>
);

export default ListFooterComponent;
