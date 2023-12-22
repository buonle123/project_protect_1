import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const ButtonCustom = ({
  children,
  onPress,
  mode,
  style,
  styleBoder,
  textColor,
  icon,
}) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View
          style={[styles.button, mode === "flat" && styles.flat, styleBoder]}
        >
          <Text
            style={[
              styles.buttonText,
              mode === "flat" && styles.flatText,
              textColor,
            ]}
          >
            {children}
          </Text>
          {icon && (
            <Ionicons style={{ color: "white" }} name={icon} size={25} />
          )}
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: "rgb(55 128 216)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 22,
    marginRight: 15,
  },
  flat: {
    backgroundColor: "transparent",
    borderWidth: 1.35,
    borderColor: "rgb(234 88 12)",
    borderRadius: 10,
  },
  flatText: {
    color: "rgb(234 88 12)",
    fontSize: 18,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: "#ddd",
    borderRadius: 15,
  },
});
export default ButtonCustom;
