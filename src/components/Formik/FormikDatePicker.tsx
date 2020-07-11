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
  date: any;
  mode: string;
  placeholder: string;
  format: string;
  minDate?: any;
  is24Hour?: boolean;
  getDateStr?: (date: string) => void;
}
const FormikDatePicker: React.FC<IProps> = ({
  onChange,
  label,
  name,
  date,
  mode,
  placeholder,
  format,
  minDate,
  is24Hour,
  getDateStr,
  ...rest
}) => {
  const onDateChange = (date) => {
    onChange(name, date);
  };
  return (
    <View>
      <Subheading style={{ fontWeight: "bold" }}>{label}</Subheading>
      <DatePicker
        style={{ alignSelf: "center" }}
        onDateChange={onDateChange}
        date={date}
        mode={mode}
        placeholder={placeholder}
        format={format}
        minDate={minDate}
        onChange={onChange}
        name={name}
        is24Hour={is24Hour}
        getDateStr={getDateStr}
        {...rest}
      />
    </View>
  );
};

export default FormikDatePicker;
