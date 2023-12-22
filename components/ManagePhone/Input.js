import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const Input = ({ label, style, invalid, textInputConfig }) => {
  const inputStyle = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyle.push(styles.multilineText);
  }
  if (invalid) {
    inputStyle.push(styles.errorInput);
  }
  return (
    <View style={[styles.inputcontainer, style]}>
      <Text style={[styles.label, invalid && styles.errorLabel]}>{label}</Text>
      <TextInput
        style={[
          inputStyle,
          { fontSize: 35, fontWeight: "bold", letterSpacing: 20 },
        ]}
        {...textInputConfig}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputcontainer: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  label: {
    color: "#c3c3c4",
    marginLeft: -10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 8,
    padding: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  multilineText: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  errorLabel: {
    color: "white",
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 1,
  },
});

export default Input;
