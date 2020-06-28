import React, { PureComponent } from "react";
import { Picker } from "react-native";
import { Subheading } from "react-native-paper";
import styled from "styled-components";

const View = styled.View`
  padding: 10px 20px 10px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface IProps {
  onChange: (field: string, value: any, shouldValidate?: boolean) => void;
  label: string;
  name: string;
}

export default class FormikPicker extends PureComponent<IProps> {
  handleChange = (value) => {
    this.props.onChange(this.props.name, value);
  };

  render() {
    return (
      <View>
        <Subheading style={{ fontWeight: "bold" }}>
          {this.props.label}
        </Subheading>
        <Picker
          style={{ width: "200" }}
          onValueChange={this.handleChange}
          {...this.props}
        />
      </View>
    );
  }
}
