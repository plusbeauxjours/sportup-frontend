import React, { PureComponent } from "react";
import { Subheading } from "react-native-paper";
import DatePicker from "react-native-datepicker";
import styled from "styled-components/native";

const View = styled.View`
  padding: 10px 20px 10px 20px;
`;

interface IProps {
  onChange: (field: string, value: any, shouldValidate?: boolean) => void;
  label: string;
  name: string;
}
export default class FormikDatePicker extends PureComponent<IProps> {
  public onDateChange = (date) => {
    this.props.onChange(this.props.name, date);
  };

  public render() {
    return (
      <View>
        <Subheading style={{ fontWeight: "bold" }}>
          {this.props.label}
        </Subheading>
        <DatePicker
          style={{ alignSelf: "center" }}
          onDateChange={this.onDateChange}
          {...this.props}
        />
      </View>
    );
  }
}
