import React from "react";
import styled from "styled-components/native";
import { TextInput, HelperText } from "react-native-paper";
import { KeyboardTypeOptions } from "react-native";
import { DARK_ORANGE } from "../../constants/colors";

const Container = styled.View`
  width: 90%;
  align-self: center;
`;

interface IProps {
  label: string;
  error?: any;
  value: any;
  name?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  onChange: (name: string, value: string) => void;
  onTouch: (name: string) => void;
  multiline?: boolean;
  autoCorrect?: boolean;
}

const FormikInput: React.FC<IProps> = ({
  label,
  error,
  name,
  placeholder,
  onChange,
  onTouch,
  autoCapitalize,
  multiline = false,
  autoCorrect = true,
  ...rest
}) => {
  const handleChange = (value) => {
    onChange(name, value);
  };

  const handleBlur = () => {
    onTouch(name);
  };
  return (
    <Container>
      <TextInput
        label={label}
        autoCapitalize={autoCapitalize}
        onChangeText={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        error={error}
        multiline={multiline}
        autoCorrect={autoCorrect}
        style={{ backgroundColor: "transparent" }}
        theme={{ colors: { primary: DARK_ORANGE } }}
        {...rest}
      />
      <HelperText type="error" visible={error}>
        {error}
      </HelperText>
    </Container>
  );
};

export default FormikInput;
