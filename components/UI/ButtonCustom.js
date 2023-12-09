import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const ButtonCustom = ({ children, onPress, mode, style }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    backgroundColor: "#ff4859",
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flat: {
    backgroundColor: "transparent",
  },
  flatText: {
    color: "black",
    borderWidth: 1,
    padding: 8,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: "#ccc",
    borderRadius: 4,
  },
});
export default ButtonCustom;
