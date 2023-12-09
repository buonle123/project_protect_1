import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React from "react";
import { COLORS } from "../constant";

const InputField = ({
  label,
  icon,
  inputType,
  keyBoardType,
  fieldButtonLabel,
  fieldButtonFunction,
  nameInput,
  error,
  value,
  onChange,
}) => {
  return (
    <>
      <View
        style={[
          styles.inputContainer,
          { borderBottomColor: error ? "red" : "#ccc" },
        ]}
      >
        {icon}
        {inputType === "PassWord" ? (
          <TextInput
            placeholder={label}
            keyboardType={keyBoardType}
            secureTextEntry={true}
            style={styles.textInput}
            value={value}
            onChangeText={(entered) => onChange(entered, nameInput)}
          />
        ) : (
          <TextInput
            placeholder={label}
            keyboardType={keyBoardType}
            value={value}
            style={styles.textInput}
            onChangeText={(entered) => onChange(entered, nameInput)}
          />
        )}
        <TouchableOpacity onPress={fieldButtonFunction}>
          <Text style={{ color: COLORS.primary, fontWeight: 700 }}>
            {fieldButtonLabel}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{ marginVertical: 5, fontSize: 12, color: "red" }}>
        {error}
      </Text>
    </>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
  },
});

export default InputField;
