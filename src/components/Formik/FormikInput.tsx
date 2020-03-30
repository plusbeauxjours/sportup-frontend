import React from "react";
import styled from "styled-components";
import { TextInput, HelperText } from "react-native-paper";
import { KeyboardTypeOptions } from "react-native";

const Container = styled.View`
  width: 90%;
  align-self: center;
`;

interface IProps {
  label: string;
  error: any;
  value: string;
  name: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  onChange: (name: string, value: string) => void;
  onTouch: (name: string) => void;
}

const FormikInput: React.FC<IProps> = ({
  label,
  error,
  name,
  onChange,
  onTouch,
  autoCapitalize,
  ...rest
}) => {
  const handleChange = value => {
    onChange(name, value);
  };

  const handleBlur = () => {
    onTouch(name);
  };
  return (
    <Container Container>
      <TextInput
        label={label}
        autoCapitalize={autoCapitalize}
        onChangeText={handleChange}
        onBlur={handleBlur}
        placeholder={label}
        error={error}
        {...rest}
      />
      <HelperText type="error" visible={error}>
        {error}
      </HelperText>
    </Container>
  );
};

export default FormikInput;
