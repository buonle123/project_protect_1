import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../constant";

const CustomButtonAuth = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonLogin}>
      <Text style={styles.textLogin}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonLogin: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 10,
  },
  textLogin: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
    color: "#fff",
  },
});

export default CustomButtonAuth;
