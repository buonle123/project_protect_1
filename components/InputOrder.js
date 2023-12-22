import { View, TextInput, StyleSheet } from "react-native";
import React from "react";

const InputOrder = ({ label, keyBoardType, onChange, value }) => {
  const inputLowerCase = label;
  console.log(inputLowerCase.toLowerCase());
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={label}
        keyboardType={keyBoardType}
        style={styles.textInput}
        onChangeText={(entered) =>
          onChange(entered, inputLowerCase.toLowerCase())
        }
        value={value}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    marginTop: 10,
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
  },
});

export default InputOrder;
