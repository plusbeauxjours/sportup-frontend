import React from "react";
import { Picker } from "react-native";
import styled from "styled-components/native";

const View = styled.View`
  padding: 10px 20px 10px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NameText = styled.Text`
  font-size: 18px;
`;

const Caption = styled.Text`
  font-size: 10px;
  color: #999;
`;

interface IProps {
  onChange: (field: string, value: any, shouldValidate?: boolean) => void;
  label: string;
  name: string;
  selectedValue: any;
}

const FormikPicker: React.FC<IProps> = ({
  onChange,
  label,
  name,
  selectedValue,
  ...rest
}) => {
  const handleChange = (value) => {
    onChange(name, value);
  };
  return (
    <View>
      <NameText style={{ fontWeight: "bold" }}>{label}</NameText>
      <Picker
        style={{ width: 200 }}
        onValueChange={handleChange}
        selectedValue={selectedValue}
        {...rest}
      />
    </View>
  );
};

export default FormikPicker;
